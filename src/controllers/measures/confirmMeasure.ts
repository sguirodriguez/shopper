import z from "zod";
import { ErrorHandler } from "../../config/errors/error-handler";
import Measures from "../../database/models/measures";

const ConfirmMeasureSchema = z.object({
  measure_uuid: z.string(),
  confirmed_value: z.number()
});
type MeasureType = z.infer<typeof ConfirmMeasureSchema>;
class ConfirmMeasure {
  async execute({ measure_uuid, confirmed_value }: MeasureType) {
    const validateSchema = ConfirmMeasureSchema.safeParse({
      measure_uuid,
      confirmed_value
    });

    if (!validateSchema.success) {
      throw new ErrorHandler(
        `Invalid parameters on confirm measure with ${
          validateSchema.error.issues[0].path[0] +
          ": " +
          validateSchema.error.issues[0].message
        }`,
        "INVALID_DATA"
      );
    }

    const hasMeasure = await Measures.findOne({
      where: {
        uuid: measure_uuid
      }
    });

    if (!hasMeasure) {
      throw new ErrorHandler("Not found measure.", "MEASURE_NOT_FOUND");
    }

    if (hasMeasure?.confirmed_value) {
      throw new ErrorHandler(
        "Already have confirmed value for measure",
        "CONFIRMATION_DUPLICATE"
      );
    }

    await Measures.update(
      {
        confirmed_value: confirmed_value,
        updated_at: new Date()
      },
      {
        where: {
          uuid: measure_uuid
        }
      }
    );

    return {
      status: 200,
      response: {
        success: true
      }
    };
  }
}

export default new ConfirmMeasure();
