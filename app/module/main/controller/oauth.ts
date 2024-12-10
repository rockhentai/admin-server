import { EggLogger } from 'egg';
import { Inject, HTTPController, HTTPMethod, HTTPMethodEnum, HTTPBody } from '@eggjs/tegg';
import { LarkAPI } from '../service/LarkAPI';

@HTTPController({
  path: '/oauth',
})
export class OauthController {
  @Inject()
  logger: EggLogger;

  @Inject()
  larkAPI: LarkAPI;

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/code2token',
  })
  async code2token(@HTTPBody() body: { code: string }) {
    const { code } = body;
    const res = await this.larkAPI.getUserAccessToken(code);
    if (res.code === 0) {
      // 保存 token
    }
    return res;
  }
}
