/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { log } from "@services";
import { RESPONSE_MSG, STATUS_CODES } from "@enums";
import { IRequestUser } from "@interfaces";
import { APP } from "@envs";

declare module "express-serve-static-core" {
  interface Response {
    ok: (data?: unknown, message?: string) => Response;
    created: (data?: unknown, message?: string) => Response;
    badRequest: (message?: string) => Response;
    unauthorized: (message?: string) => Response;
    forbidden: (data?: unknown, message?: string) => Response;
    notFound: (message?: string) => Response;
    serverError: (data?: unknown, message?: string) => Response;
    badGateway: (data?: unknown, message?: string) => Response;
  }

  interface Request {
    user: IRequestUser;
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  res.ok = (data: unknown, message: string = RESPONSE_MSG.DATA_SUCCESS) => {
    log.info(`${message}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.OK).json({
      status: RESPONSE_MSG.STATUS_SUCCESS,
      data,
      message,
    });
  };

  res.created = (data: unknown, message: string = RESPONSE_MSG.DATA_CREATED) => {
    log.info(`${message}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.CREATED).json({
      status: RESPONSE_MSG.STATUS_SUCCESS,
      data,
      message,
    });
  };

  res.badRequest = (message: string = RESPONSE_MSG.BAD_REQUEST) => {
    log.info(`${message}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.unauthorized = (message: string = RESPONSE_MSG.UNAUTHORIZED) => {
    log.info(`${message}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.notFound = (message: string = RESPONSE_MSG.NOT_FOUND) => {
    log.info(`${message}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  res.serverError = (data: unknown, message: string = RESPONSE_MSG.ERROR_OCURRED) => {
    log.error(`${message}, ${data}, ${formatRequest(req)}`);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: RESPONSE_MSG.STATUS_ERROR,
      message,
    });
  };

  return next();
};

function formatRequest(request: Request) {
  const body = request.body;
  const headers = request.headers;
  const method = request.method;
  const endpoint = request.originalUrl;
  const params = request.params;
  const query = request.query;

  if (request.body.password) {
    request.body.password = "******";
  }

  if (request.headers[APP.AUTH_HEADER]) {
    request.headers[APP.AUTH_HEADER] = "******";
  }

  return JSON.stringify({
    method,
    endpoint,
    body,
    params,
    query,
    headers,
  });
}
