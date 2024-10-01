import { Request, Response } from "express";
import "express-async-errors";
import express from "express";
import listAllCustomers from "../controllers/customers/listAllCustomers";
import listAllMeasures from "../controllers/measures/listAllMeasures";
import makeMeasure from "../controllers/measures/makeMeasure";
import confirmMeasure from "../controllers/measures/confirmMeasure";

const routes = express.Router();

routes.get("/", async (_request: Request, response: Response) => {
  try {
    return response.status(200).json("Online server!");
  } catch (error) {
    return response.status(500).json({ data: null, error });
  }
});

routes.get("/customers", async (_request, response) => {
  const result = await listAllCustomers.execute();

  return response.status(result.status).json(result.response);
});

routes.get("/measures", async (_request, response) => {
  const result = await listAllMeasures.execute();

  return response.status(result.status).json(result.response);
});

routes.post("/upload", async (request, response) => {
  const result = await makeMeasure.execute({
    ...request.body
  });

  return response.status(result.status).json(result.response);
});

routes.patch("/confirm", async (request, response) => {
  const result = await confirmMeasure.execute({
    ...request.body
  });

  return response.status(result.status).json(result.response);
});

routes.get("/:customer_code/list", async (request, response) => {
  const { customer_code } = request.params;

  const result = await listAllMeasures.findMeasuresByCustomerCode({
    customer_code,
    ...request.query
  });

  return response.status(result.status).json(result.response);
});

export default routes;
