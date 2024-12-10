// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportTokenCheck from '../../../app/middleware/tokenCheck';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    tokenCheck: typeof ExportTokenCheck;
  }
}
