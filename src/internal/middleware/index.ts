import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression
} from "./common";
import { handleAPIDocs } from "./apiDocs";
import { handle404Error, handleClientError, handleServerError } from "./error";


export const errorHandlers =[
  handle404Error,
  handleClientError,
  handleServerError
]

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleAPIDocs
];

