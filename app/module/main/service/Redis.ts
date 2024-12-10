import { EggLogger, EggAppConfig } from 'egg';
import { SingletonProto, AccessLevel, Inject, EggQualifier, EggType } from '@eggjs/tegg';
import { Redis as RedisClient } from 'ioredis';


@SingletonProto({
  accessLevel: AccessLevel.PUBLIC,
})
export class Redis {
  @Inject()
  logger: EggLogger;

  @Inject()
  config: EggAppConfig;

  @Inject()
  @EggQualifier(EggType.APP)
  redis: RedisClient;

  /**
   * 保存用户 token 信息
   * @param accessToken 访问令牌
   * @param tokenInfo token 相关信息
   */
  async saveUserToken(): Promise<void> {
    console.log('saveUserToken');
    // this.redis.set('');
  }

}
