import { EggLogger, EggAppConfig } from 'egg';
import { SingletonProto, AccessLevel, Inject } from '@eggjs/tegg';
import * as lark from '@larksuiteoapi/node-sdk';

type LarkClient = InstanceType<typeof lark.Client>;
export type GetApplicationListOptions = Parameters<LarkClient['hire']['application']['list']>[0];
export type AddHireNoteOptions = Parameters<LarkClient['hire']['note']['create']>[0];


@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class LarkAPI {
  @Inject()
  logger: EggLogger;

  @Inject()
  config: EggAppConfig;

  private client: lark.Client;

  constructor() {
    if (!process.env.LARK_APP_ID || !process.env.LARK_APP_SECRET) {
      throw new Error('Missing LARK_APP_ID or LARK_APP_SECRET environment variables');
    }
    this.client = new lark.Client({
      appId: process.env.LARK_APP_ID,
      appSecret: process.env.LARK_APP_SECRET,
    });
  }

  async getUserAccessToken(code: string) {
    const res = await this.client.authen.accessToken.create({
      data: {
        grant_type: 'authorization_code',
        code,
      },
    });
    this.logger.info('get user access token: ', res);
    return res;
  }

  async getUserInfo(accessToken: string) {
    const res = await this.client.authen.userInfo.get({}, lark.withUserAccessToken(accessToken));
    this.logger.info('get user info: ', res);
    return res;
  }

  async logout(data: {
    sid: string;
    terminal_type?: Array<number>;
    logout_reason?: number;
  }) {
    const res = await this.client.passport.session.logout({
      data: {
        logout_type: 3,
        ...data,
      },
      params: {
        user_id_type: 'open_id',
      },
    });
    this.logger.info('logout: ', res);
    return res;
  }
}
