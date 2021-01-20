// export interface IBaseDao {
//   /**
//    * 找不到如何在依赖注入时传递构造方法参数,只能实例化后手动初始化
//    * @param Model
//    */
//   init(Model): void;

//   /**
//    * 使用 Model 的 静态方法 create() 添加 doc
//    *
//    * @param obj 构造实体的对象
//    * @returns {Promise}
//    */
//   create(obj: any): Promise<any>;

//   /**
//    * 使用 Model save() 添加 doc
//    *
//    * @param obj 构造实体的对象
//    * @returns {Promise}
//    */
//   save(obj): Promise<any>;

//   /**
//    * 列表查询
//    *
//    * @param condition 查找条件
//    * @param constraints
//    * @returns {Promise}
//    */
//   list(condition: any, constraints?: any): Promise<any>;

//   /**
//    * 单条查询
//    *
//    * @param condition
//    * @param constraints
//    * @returns {Promise}
//    */
//   get(condition: any, constraints?: any): Promise<any>;

//   /**
//    * 更新 docs
//    *
//    * @param condition 查找条件
//    * @param updater 更新操作
//    * @returns {Promise}
//    */
//   update(condition: any, updater?: any): Promise<any>;

//   /**
//    * 移除 doc
//    *
//    * @param condition 查找条件
//    * @returns {Promise}
//    */
//   remove(obj: any): Promise<any>;

//   populate(obj: any): Promise<any>;
// }

import { Model, Document, Query } from 'mongoose';

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

export interface IBaseDao {
  init(model: Model<Document>): void;

  create(obj: any, options?: any): Promise<Document>;

  save(obj: any, options?: any): Promise<Document>;

  update(filter: any, obj: any, options?: any): Promise<UpdateResult>;

  remove(filter: any, options?: any): Promise<DeleteResult>;

  get(filter: any, projection?: any, options?: any): Query<any, Document>;

  list(filter: any, projection?: any, options?: any): Query<any, Document>;
}
