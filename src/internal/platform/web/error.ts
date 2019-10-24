export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;
  readonly errorCode!: string;

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ApplicationError extends Error {
  readonly statusCode: number = 500;
  readonly errorCode: string = "unknown_error";
  constructor(statusCode: number, errorCode:string, message: string = "Internal Server Error") {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(message: string | object = "Not found") {
    super(message);
  }
}
