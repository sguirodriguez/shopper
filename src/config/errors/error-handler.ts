import { ErrorTypes } from ".";

export class ErrorHandler extends Error {
  public readonly type: ErrorTypes;
  constructor(message: string, type: ErrorTypes) {
    super(message);
    this.type = type;
  }
}
