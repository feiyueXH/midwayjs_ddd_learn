import { App, Provide } from '@midwayjs/decorator';
import { Application } from 'egg';
import { BaseDao } from './dao/baseDao';
import { schemaArray } from './index';
@Provide()
export class DaoFactory {
  @App()
  app: Application;

  daoMap = {};

  private firstObjIndexOf(params, array) {
    for (let i = 0, l = array.length; i < l; i++) {
      const item = array[i];
      let flag = true;
      for (const key in params) {
        if (item[key] !== params[key]) {
          flag = false;
          break;
        }
      }

      if (flag === true) {
        return i;
      }
    }
    return -1;
  }

  /**
   * 给每个数据库连接对象构建Model
   * @param dbName 数据库标志
   * @param conn 数据库连接对象
   */
  public async constructModel(dbName, conn) {
    this.daoMap[dbName] = [];
    for (const item of schemaArray) {
      let daoName = item.modelName + 'Dao';
      // console.log('>>>>daoName:' + daoName);
      const model = conn.model(item.modelName, item.schema); //创建mongoose的Model
      if (!this.app.applicationContext.isAsync(daoName)) {
        daoName = 'baseDao';
      }
      const dao: BaseDao = await this.app.applicationContext.getAsync(daoName);

      // console.log(dao);
      dao.init(model);
      this.daoMap[dbName].push({
        modelName: item.modelName,
        dao: dao,
      });
    }
  }

  /**
   * 获取Dao实例
   * @param dbName 数据库标志
   * @param filter 筛选条件 filter.modelName模块名
   */
  public getDao(
    dbName: string, //数据库名
    filter: any
  ): any {
    const index = this.firstObjIndexOf(
      {
        modelName: filter.modelName,
      },
      this.daoMap[dbName] ? this.daoMap[dbName] : []
    );
    console.log('index:', index);
    console.log(this.daoMap[dbName]);
    if (index === -1) {
      return null;
    } else {
      return this.daoMap[dbName][index].dao;
    }
  }
}
