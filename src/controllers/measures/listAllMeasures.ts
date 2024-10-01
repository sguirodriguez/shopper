import z from "zod";
import { ErrorHandler } from "../../config/errors/error-handler";
import Measures from "../../database/models/measures";

const MeasuresByCustomerCode = z.object({
  customer_code: z.string(),
  measure_type: z.enum(["water", "gas"]).optional()
});
type MeasuresByCustomerCodeType = z.infer<typeof MeasuresByCustomerCode>;
class ListAllMeasures {
  async execute() {
    const measures = await Measures.findAll();

    if (!measures) {
      throw new ErrorHandler("Measures not found!", "MEASURES_NOT_FOUND");
    }

    return {
      status: 200,
      response: measures
    };
  }

  async findMeasuresByCustomerCode({
    customer_code,
    measure_type
  }: MeasuresByCustomerCodeType) {
    if (
      measure_type &&
      measure_type.toLowerCase() !== "gas" &&
      measure_type.toLowerCase() !== "water"
    ) {
      throw new ErrorHandler(
        "Parameter Measurement Type must be either 'WATER' or 'GAS'",
        "INVALID_TYPE"
      );
    }

    const hasType = measure_type ? { type: measure_type.toLowerCase() } : {};
    const measures = await Measures.findAll({
      where: {
        customerId: Number(customer_code),
        ...hasType
      }
    });

    if (!measures) {
      throw new ErrorHandler("Measures not found!", "MEASURES_NOT_FOUND");
    }

    return {
      status: 200,
      response: measures
    };
  }
}

export default new ListAllMeasures();
