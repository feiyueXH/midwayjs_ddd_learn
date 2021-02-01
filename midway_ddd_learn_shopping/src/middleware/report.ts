//src\middleware\report.ts
import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  version = 'V2000'; //这里将是一个动态，根据数据库标志查询的功能版本号
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext): Promise<void> => {
      console.log(ctx.request.url);
      //将版本号替换到请求链接中
      ctx.request.url = ctx.request.url.replace(/__VERSION__/, this.version);
      console.log(`触发API:${ctx.request.url}`);
      const startTime = Date.now();
      await next();
      console.log(`执行API用时(ms):${Date.now() - startTime}`);
    };
  }
}
