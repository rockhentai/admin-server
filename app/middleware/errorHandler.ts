import { Context } from 'egg';

interface ErrorResponse {
  success: boolean;
  message: string;
  code: number;
  data?: any;
}

export default function errorHandler(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err: any) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.logger.error(err);
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端
      const error: ErrorResponse = {
        success: false,
        code: status,
        message: status === 500 && ctx.app.config.env === 'prod'
          ? '服务器内部错误'
          : err.message,
      };

      // 从 error 对象上读取各个属性，设置到响应中
      if (err.data) {
        error.data = err.data;
      }

      ctx.status = status;
      ctx.body = error;
    }
  };
}
