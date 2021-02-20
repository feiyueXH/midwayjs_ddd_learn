import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Model, Document, Connection, ClientSession } from 'mongoose';

export interface CreateResult {
  insertedCount: number;
}

export interface UpdateResult {
  matchedCount: number; //匹配数量
  modifiedCount: number; //修改数量
}

export interface DeleteResult {
  matchedCount: number; //匹配数量
  deletedCount: number; //删除数量
}

export interface IOptions {
  [propName: string]: any;
  session?: ClientSession;
}

export interface IFilter {
  [propName: string]: any;
}

export interface IObj {
  [propName: string]: any;
}

export interface IProjection {
  [propName: string]: number;
}

import { schemaArray } from './schema/index';
@Provide()
@Scope(ScopeEnum.Request) //作用域设置全局唯一
export class MongoDbContext {
  static modelMap: Map<
    string,
    Array<{ modelName: string; model: Model<Document> }>
  > = new Map<string, Array<{ modelName: string; model: Model<Document> }>>();

  private dbName: string;

  /**
   * 给每个数据库连接对象构建Model
   * @param dbName 数据库标志
   * @param conn 数据库连接对象
   */
  public static async constructModel(
    dbName: string,
    conn: Connection
  ): Promise<void> {
    this.modelMap.set(dbName, []);
    const modelArray = new Array<{
      modelName: string;
      model: Model<Document>;
    }>();
    for (const item of schemaArray) {
      const model: Model<Document> = conn.model(item.modelName, item.schema); //创建mongoose的Model
      modelArray.push({
        modelName: item.modelName,
        model: model,
      });
    }
    this.modelMap.set(dbName, modelArray);
  }

  /**
   * 切换数据库
   * @param dbName
   */
  public switchDatabase(dbName: string): MongoDbContext {
    if (MongoDbContext.modelMap.has(dbName)) {
      this.dbName = dbName;
      return this;
    } else {
      throw new Error(`找不到指定数据库:${dbName}`);
    }
  }

  /**
   * 获取数据库连接对象上的指定Model
   * @param modelName
   */
  private getModel(modelName: string): Model<Document> {
    if (MongoDbContext.modelMap.has(this.dbName)) {
      const model = MongoDbContext.modelMap
        .get(this.dbName)
        .find(item => item.modelName === modelName).model;
      return model;
    } else {
      throw new Error(`找不到指定数据库:${this.dbName}`);
    }
  }

  /**
   * 创建多行数据
   * @param modelName 指定modelName
   * @param obj[] 保存内容
   * @param options 执行参数
   */
  async create(
    modelName: string,
    obj: IOptions[],
    options?: IOptions
  ): Promise<Document<any>[]> {
    console.log(`create->options:${options}`);
    const model = this.getModel(modelName);
    return await model.create(obj, options);
  }

  /**
   * 保存单行数据
   * @param modelName 指定modelName
   * @param obj 保存内容
   * @param options 执行参数
   */
  async save(
    modelName: string,
    obj: IObj,
    options?: IOptions
  ): Promise<Document<any>> {
    const model = this.getModel(modelName);
    console.log(`save->options:${options}`);
    const entity = new model(obj);
    return await entity.save(options);
  }

  /**
   * 更新数据(多行)
   * @param modelName 指定modelName
   * @param filter 筛选条件
   * @param obj 保存内容
   * @param options 执行参数
   */
  async update(
    modelName: string,
    filter: IFilter,
    obj: IObj,
    options?: IOptions
  ): Promise<UpdateResult> {
    console.log(`update->options:${options}`);
    const model = this.getModel(modelName);
    const res = await model.updateMany(filter, obj, options);
    const result: UpdateResult = {
      matchedCount: res.n,
      modifiedCount: res.nModified,
    };
    return result;
  }

  /**
   * 移除数据(多行)
   * @param modelName 指定modelName
   * @param filter 筛选条件
   * @param options 执行参数
   */
  async remove(
    modelName: string,
    filter: IFilter,
    options?: IOptions
  ): Promise<DeleteResult> {
    console.log(`remove->options:${options}`);
    const model = this.getModel(modelName);
    const res = await model.deleteMany(filter, options);
    const result: DeleteResult = {
      matchedCount: res.n,
      deletedCount: res.deletedCount,
    };
    return result;
  }

  /**
   * 查询单条数据
   * @param modelName 指定modelName
   * @param filter 筛选条件
   * @param projection 字段过滤
   * @param options 执行参数
   */
  async get(
    modelName: string,
    filter: IFilter,
    projection?: IProjection,
    options?: IOptions
  ): Promise<Document> {
    const model = this.getModel(modelName);
    console.log(`list->options:${options}`);
    return await model.findOne(filter, projection, options);
  }

  /**
   * 查询多条数据
   * @param modelName 指定modelName
   * @param filter 筛选条件
   * @param projection 字段过滤
   * @param options 执行参数
   */
  async list(
    modelName: string,
    filter: IFilter,
    projection?: IProjection,
    options?: IOptions
  ): Promise<Document[]> {
    const model = this.getModel(modelName);
    return model.find(filter, projection, options);
  }
}
