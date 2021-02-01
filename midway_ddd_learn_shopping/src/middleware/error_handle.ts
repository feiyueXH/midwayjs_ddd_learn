//src\middleware\report.ts
import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { MongoUnitOfWork } from '../infrastructure/db/mongodb/dbUow';
import {
  BasicException,
  BasicExceptionCode,
} from '../infrastructure/http/exception/basic';

@Provide()
export class ErrorHandleMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext): Promise<void> => {
      const uow = await ctx.requestContext.getAsync<MongoUnitOfWork>(
        MongoUnitOfWork
      );
      try {
        await next();
        console.log('ctx.status:', ctx.status);
        if (ctx.status === 200) {
          //如果执行成功,提交事务
          await uow.commit();
        } else {
          //如果出现其他错误没有被try...catch捕获的话,也需要进行事务回滚
          await uow.abort();
        }
        // ctx.body = ctx.body || {};
        // //请求执行成功,默认添加状态码
        // ctx.body.code = BasicExceptionCode.SUCCESS[0];
      } catch (err) {
        await await uow.abort(); //事务回滚
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);
        console.log(ctx.status);
        const status = ctx.status || 500;
        let exception: BasicException;
        if (err instanceof BasicException === false) {
          exception = new BasicException(
            BasicExceptionCode.UNKNOWN_ERR,
            err.message,
            status
          );
        } else {
          exception = err;
        }

        const error = {
          requestUrl: `${ctx.method} : ${ctx.path}`,
          code: exception.getCode(),
          message: exception.getMsg(),
          label: exception.getLabel(),
        };

        // 从 error 对象上读出各个属性，设置到响应中
        ctx.body = error;
        ctx.status = exception.getStatus();
      }
    };
  }
}
