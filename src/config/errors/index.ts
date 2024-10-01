type ErrorDetail = {
  code: number;
  error: string;
  statusCode: number;
};

export type ErrorTypes =
  | "GENERAL"
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "ACCESS_DENIED"
  | "IMAGE_VALIDATION"
  | "IMAGE_MEASURE_ERROR_GEMINI"
  | "EMAIL_REGISTERED"
  | "USER_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "EMAIL_INVALID"
  | "INVALID_DATA"
  | "DOUBLE_REPORT"
  | "ERROR_GENERATE_LINK_IMAGE"
  | "MEASURE_NOT_FOUND"
  | "CONFIRMATION_DUPLICATE"
  | "MEASURES_NOT_FOUND"
  | "CUSTOMERS_NOT_FOUND"
  | "INVALID_TYPE"
  | "SECURITY";

const errors: Record<string, ErrorDetail> = {
  GENERAL: {
    code: 1,
    error: "GENERAL",
    statusCode: 500
  },
  UNAUTHORIZED: {
    code: 2,
    error: "UNAUTHORIZED",
    statusCode: 401
  },
  VALIDATION_ERROR: {
    code: 3,
    error: "VALIDATION_ERROR",
    statusCode: 409
  },
  NOT_FOUND: {
    code: 4,
    error: "NOT_FOUND",
    statusCode: 404
  },
  ACCESS_DENIED: {
    code: 5,
    error: "ACCESS_DENIED",
    statusCode: 403
  },
  IMAGE_VALIDATION: {
    code: 6,
    error: "IMAGE_VALIDATION",
    statusCode: 409
  },
  IMAGE_MEASURE_ERROR_GEMINI: {
    code: 7,
    error: "IMAGE_MEASURE_ERROR_GEMINI",
    statusCode: 409
  },
  EMAIL_REGISTERED: {
    code: 8,
    error: "EMAIL_REGISTERED",
    statusCode: 409
  },
  USER_NOT_FOUND: {
    code: 9,
    error: "USER_NOT_FOUND",
    statusCode: 409
  },
  INVALID_PASSWORD: {
    code: 10,
    error: "INVALID_PASSWORD",
    statusCode: 409
  },
  EMAIL_INVALID: {
    code: 11,
    error: "EMAIL_INVALID",
    statusCode: 409
  },
  INVALID_DATA: {
    code: 12,
    error: "INVALID_DATA",
    statusCode: 400
  },
  DOUBLE_REPORT: {
    code: 13,
    error: "DOUBLE_REPORT",
    statusCode: 409
  },
  ERROR_GENERATE_LINK_IMAGE: {
    code: 14,
    error: "ERROR_GENERATE_LINK_IMAGE",
    statusCode: 409
  },
  MEASURE_NOT_FOUND: {
    code: 15,
    error: "MEASURE_NOT_FOUND",
    statusCode: 404
  },
  CONFIRMATION_DUPLICATE: {
    code: 16,
    error: "CONFIRMATION_DUPLICATE",
    statusCode: 409
  },
  MEASURES_NOT_FOUND: {
    code: 17,
    error: "MEASURES_NOT_FOUND",
    statusCode: 404
  },
  CUSTOMERS_NOT_FOUND: {
    code: 18,
    error: "CUSTOMERS_NOT_FOUND",
    statusCode: 404
  },
  INVALID_TYPE: {
    code: 19,
    error: "INVALID_TYPE",
    statusCode: 400
  },
  SECURITY: {
    code: 999,
    error: "ACCESS_DENIED",
    statusCode: 400
  }
};

export const getErrorByType = (type: string): ErrorDetail => {
  return (
    errors[type] || {
      code: 1,
      error: "GENERAL",
      statusCode: 500
    }
  );
};
