import z from "zod";
import { ErrorHandler } from "../../config/errors/error-handler";
import { measureWithGemini } from "../../services/adapters/gemini";
import { parseBase64Data } from "../../utils/converter";
import Measures from "../../database/models/measures";
import Customers from "../../database/models/customers";
import { Op } from "sequelize";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { uploadInFileIO } from "../../services/adapters/fileio";

const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const MeasureSchema = z.object({
  image: z
    .string()
    .regex(/^data:image\/[a-zA-Z]+;base64,[^\s]+$/, "Invalid base64 image"),
  customer_code: z.string(),
  measure_datetime: z.string().regex(iso8601Regex, "Invalid datetime format"),
  measure_type: z.enum(["water", "gas"])
});

type MeasureType = z.infer<typeof MeasureSchema>;
class MakeMeasure {
  async execute({
    image,
    customer_code,
    measure_datetime,
    measure_type
  }: MeasureType) {
    const validateSchema = MeasureSchema.safeParse({
      image,
      customer_code,
      measure_datetime,
      measure_type
    });

    if (!validateSchema.success) {
      throw new ErrorHandler(
        `Invalid parameters on make measure with ${
          validateSchema.error.issues[0].path[0] +
          ": " +
          validateSchema.error.issues[0].message
        }`,
        "INVALID_DATA"
      );
    }

    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();
    const hasMeasure = await Measures.findAll({
      where: {
        measure_datetime: {
          [Op.gte]: startOfMonth,
          [Op.lt]: endOfMonth
        },
        type: measure_type
      },
      include: [
        {
          model: Customers,
          as: "customers",
          where: {
            id: Number(customer_code)
          }
        }
      ]
    });

    if (hasMeasure.length) {
      throw new ErrorHandler(
        "Already exists a measure in this month with this type",
        "DOUBLE_REPORT"
      );
    }

    const { mimeType, base64String, extension } = parseBase64Data(image);

    const measureValue = await measureWithGemini({
      data: base64String,
      mimeType
    });

    const customerExist = await Customers.findByPk(Number(customer_code));

    if (!customerExist) {
      throw new ErrorHandler("Customer doesn't exist", "NOT_FOUND");
    }
    const uuid = uuidv4();
    const uploadFile = await uploadInFileIO({
      imageBase64: image,
      title: `${uuid}.${extension}`
    });

    if (!uploadFile) {
      throw new ErrorHandler(
        "Can't generate link temporary",
        "ERROR_GENERATE_LINK_IMAGE"
      );
    }

    const measure = await Measures.create({
      uuid,
      customer_id: Number(customer_code),
      image_data: base64String,
      image_extension: extension,
      value: Number(measureValue),
      type: measure_type,
      measure_datetime: measure_datetime,
      created_at: new Date(),
      updated_at: new Date()
    });

    return {
      status: 200,
      response: {
        image_url: uploadFile,
        measure_uuid: measure.uuid,
        measure_value: Number(measureValue)
      }
    };
  }
}

export default new MakeMeasure();
