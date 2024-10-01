import { ErrorHandler } from "../../config/errors/error-handler";
import Customers from "../../database/models/customers";

class ListAllCustomers {
  async execute() {
    const customers = await Customers.findAll();

    if (!customers) {
      throw new ErrorHandler("Customers not found!", "CUSTOMERS_NOT_FOUND");
    }

    return {
      status: 200,
      response: customers
    };
  }
}

export default new ListAllCustomers();
