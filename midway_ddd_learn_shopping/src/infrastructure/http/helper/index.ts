// import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { BasicExceptionCode } from '../exception/basic';

@Provide()
export class HttpHelper {
  @Inject()
  private ctx: Context;
  /**
   * 处理成功响应
   * @param ctx
   * @param result
   * @param message
   * @param status
   */
  public success(
    result: any = null,
    message = '请求成功',
    status = 200,
    code?: ReadonlyArray<string>
  ): void {
    code = code ? code : BasicExceptionCode.SUCCESS;
    this.ctx.body = {
      code: code[0],
      message,
      data: result,
      label: code[1],
    };
    this.ctx.status = status;
  }

  //没有error，所有错误都是throw new BasicException(BasicExceptionCode.*)抛出异常,在全局错误处理中间件中处理
}
