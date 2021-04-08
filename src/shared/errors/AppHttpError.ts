export default class AppHttpError {
  constructor(message: string, statusCode = 400, errorType: string = '') {
    this.message = message;
    this.statusCode = statusCode;
    if (errorType !== '') this.errorType = errorType;
  }

  public readonly message: string;

  public readonly statusCode: number;

  public readonly errorType: string;
}
