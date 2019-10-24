
import { Request, Response, NextFunction, Router } from "express";
import { HTTP404Error, HTTPClientError, ApplicationError } from "../platform/web/error";
export const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    throw new HTTP404Error("Method not found.");
  });
};

export const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    clientError(err, res, next);
  });
};

export const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    serverError(err, res, next);
  });
};

const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).send({
      error_description: err.message,
      error: err.statusCode
    });
  } else {
    next(err);
  }
};

const serverError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send({
      error: err.errorCode,
      error_description: err.message || 'Internal Server Error'
    });
  } else {
    res.status(500).send(err.stack);
  }
};
