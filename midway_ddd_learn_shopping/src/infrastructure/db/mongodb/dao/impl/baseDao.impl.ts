import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { DeleteResult, IBaseDao, UpdateResult } from '../baseDao';
import { Model, Document } from 'mongoose';
@Provide('baseDao')
@Scope(ScopeEnum.Prototype) //作用域设置为每次调用都会创建一个新的对象
export class BaseDaoImpl implements IBaseDao {
  model: Model<Document>;
  init(model: Model<Document<any>>): void {
    if (!model) {
      throw new Error(
        model + ' is not valid, please check if it is a mongoose model!'
      );
    }
    this.model = model;
  }

  create(obj: any, options?: any): Promise<Document<any>> {
    const entity = new this.model(obj);
    return this.model.create(entity);
  }
  save(obj: any, options?: any): Promise<Document<any>> {
    const entity = new this.model(obj);
    return entity.save();
  }
  update(filter: any, obj: any, options?: any): Promise<UpdateResult> {
    return new Promise((resolve, reject) => {
      this.model.updateMany(filter, obj, options).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          const result: UpdateResult = {
            matchedCount: res.n,
            modifiedCount: res.nModified,
          };
          resolve(result);
        }
      });
    });
  }
  remove(filter: any, options?: any): Promise<DeleteResult> {
    return new Promise((resolve, reject) => {
      this.model.deleteMany(filter, options).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          const result: DeleteResult = {
            matchedCount: res.n,
            deletedCount: res.deletedCount,
          };
          resolve(result);
        }
      });
    });
  }

  async get(filter: any, projection?: any, options?: any): Promise<Document> {
    return await this.model.findOne(filter, projection, options);
  }

  async list(
    filter: any,
    projection?: any,
    options?: any
  ): Promise<Document<any>[]> {
    return await this.model.find(filter, projection, options);
  }
}

// /**
//  * author: Shawn
//  * time  : 2017/8/31 10:40
//  * desc  : Book Schema 和 model
//  * update: Shawn 2017/8/31 10:40
//  */
// import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
// import { IBaseDao } from '../baseDao';
// import { Model, Document } from 'mongoose';
// @Provide('baseDao')
// @Scope(ScopeEnum.Prototype) //作用域设置为每次调用都会创建一个新的对象
// export class BaseDaoImpl implements IBaseDao {
//   model: Model<Document>;
//   /**
//    * 子类构造传入对应的 model 类
//    *
//    * @param model
//    */
//   constructor() {}
//   populate(obj: any): Promise<any> {
//     throw new Error('Method not implemented.');
//   }

//   init(model: Model<Document>): void {
//     if (!model) {
//       throw new Error(
//         model + ' is not valid, please check if it is a mongoose model!'
//       );
//     }
//     this.model = model;
//   }

//   /**
//    * 使用 model 的 静态方法 create() 添加 doc
//    *
//    * @param obj 构造实体的对象
//    * @returns {Promise}
//    */
//   public create(obj): Promise<Document> {
//     return new Promise((resolve, reject) => {
//       const entity = new this.model(obj);
//       this.model.create(entity, (error, result) => {
//         if (error) {
//           console.log('create error--> ', error);
//           reject(error);
//         } else {
//           console.log('create result--> ', result);
//           resolve(result);
//         }
//       });
//     });
//   }

//   /**
//    * 使用 model save() 添加 doc
//    *
//    * @param obj 构造实体的对象
//    * @returns {Promise}
//    */
//   public save(obj): Promise<Document> {
//     return new Promise((resolve, reject) => {
//       const entity = new this.model(obj);
//       entity.save((error, result) => {
//         if (error) {
//           console.log('save error--> ', error);
//           reject(error);
//         } else {
//           console.log('save result--> ', result);
//           resolve(result);
//         }
//       });
//     });
//   }

//   /**
//    * 查询所有符合条件 docs
//    *
//    * @param condition 查找条件
//    * @param constraints
//    * @returns {Promise}
//    */
//   public list(condition, constraints) {
//     return new Promise((resolve, reject) => {
//       this.model.find(
//         condition,
//         constraints ? constraints : null,
//         (error, results) => {
//           if (error) {
//             console.log('findAll error--> ', error);
//             reject(error);
//           } else {
//             console.log('findAll results--> ', results);
//             resolve(results);
//           }
//         }
//       );
//     });
//   }

//   /**
//    * 查找符合条件的第一条 doc
//    *
//    * @param condition
//    * @param constraints
//    * @returns {Promise}
//    */
//   public get(condition: any, constraints?: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//       this.model.findOne(
//         condition,
//         constraints ? constraints : null,
//         (error, results) => {
//           if (error) {
//             console.log('findOne error--> ', error);
//             reject(error);
//           } else {
//             console.log('findOne results--> ', results);
//             resolve(results);
//           }
//         }
//       );
//     });
//   }

//   /**
//    * 更新 docs
//    *
//    * @param condition 查找条件
//    * @param updater 更新操作
//    * @returns {Promise}
//    */
//   public update(condition, updater) {
//     return new Promise((resolve, reject) => {
//       this.model.update(condition, updater, (error, results) => {
//         if (error) {
//           console.log('update error--> ', error);
//           reject(error);
//         } else {
//           console.log('update results--> ', results);
//           resolve(results);
//         }
//       });
//     });
//   }

//   /**
//    * 移除 doc
//    *
//    * @param condition 查找条件
//    * @returns {Promise}
//    */
//   public remove(condition) {
//     return new Promise((resolve, reject) => {
//       this.model.remove(condition, (error, result) => {
//         if (error) {
//           console.log('remove error--> ', error);
//           reject(error);
//         } else {
//           console.log('remove result--> ', result);
//           resolve(result);
//         }
//       });
//     });
//   }
// }
