import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
const mongoose = require('mongoose');
/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
mongoose.Promise = global.Promise;
interface iReplicaSet {
  name: string;
  members: Array<{ host: string; port: string }>;
}

interface IMongoConfig {
  key: string;
  db: string;
  user: string;
  pass: string;
  host: string;
  port: string;
  replicaSet: iReplicaSet;
}

@Scope(ScopeEnum.Singleton)
@Provide()
export class MongoDbManager {
  private dbMap = new Map();

  private getMongoOptions(config: IMongoConfig) {
    const options = {
      // useMongoClient: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 5, // 连接池中维护的连接数
      // reconnectTries: Number.MAX_VALUE,
      keepAlive: 120,
      user: config.user,
      pass: config.pass,
      replicaSet:
        !!config.replicaSet && !!config.replicaSet.name
          ? config.replicaSet.name
          : null,
    };

    return options;
  }

  /**
   * 拼接 MongoDb Uri
   *
   * @returns {string}
   */
  private getMongoUri(config: IMongoConfig): string {
    let mongoUri = 'mongodb://';
    const dbName = config.db;
    const replicaSet = config.replicaSet;
    if (replicaSet.name) {
      // 如果配置了 replicaSet 的名字 则使用 replicaSet
      const members = replicaSet.members;
      for (const member of members) {
        mongoUri += `${member.host}:${member.port},`;
      }
      mongoUri = mongoUri.slice(0, -1); // 去掉末尾逗号
    } else {
      mongoUri += `${config.host}:${config.port}`;
    }
    mongoUri += `/${dbName}`;

    return mongoUri;
  }

  pushDB(config: IMongoConfig): any {
    const mongoClient = mongoose.createConnection(
      this.getMongoUri(config),
      this.getMongoOptions(config)
    );

    this.removeDB(config.key);
    this.dbMap.set(config.key, mongoClient);

    /**
     * Mongo 连接成功回调
     */
    mongoClient.on('connected', () => {
      console.log('Mongoose connected');
    });
    /**
     * Mongo 连接失败回调
     */
    mongoClient.on('error', err => {
      console.error('Mongoose connection error: ' + err);
    });
    /**
     * Mongo 关闭连接回调
     */
    mongoClient.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    return mongoClient;
  }

  getDB(key: string): any {
    if (this.dbMap.has(key)) {
      return this.dbMap.get(key);
    }
    return null;
  }

  removeDB(key: string): void {
    if (this.dbMap.has(key)) {
      this.dbMap.get(key).close();
    }
  }

  removeAll(): void {
    this.dbMap.forEach((item, key) => {
      this.removeDB(key);
    });
  }
}
