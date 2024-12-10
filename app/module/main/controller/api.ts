import {
  Inject, HTTPController, HTTPMethod, HTTPMethodEnum,
  Context, EggContext,
} from '@eggjs/tegg';
import { LarkAPI } from '../service/LarkAPI';


@HTTPController({
  path: '/api',
})
export class ApiController {
  @Inject()
  larkAPI: LarkAPI;

  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/userinfo',
  })
  async userinfo(@Context() ctx: EggContext) {
    const res = await this.larkAPI.getUserInfo(ctx.token);
    return res;
  }

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/logout',
  })
  async logout() {
    console.log('logout');
  }
}
