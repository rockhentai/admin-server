import { Context } from 'egg';

/**
 * Token verification middleware
 * Checks if the request contains a valid token in headers
 */
export default function tokenCheck(): (ctx: Context, next: () => Promise<any>) => Promise<void> {
  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const authHeader = ctx.get('Authorization');
    if (!authHeader) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: 'Unauthorized: Missing token',
      };
      return;
    }

    const [ bearer, token ] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: 'Unauthorized: Invalid token',
      };
      return;
    }

    ctx.token = token;
    await next();
  };
}
