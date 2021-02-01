import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
    //取消scrf安全机制,不然无法直接通过脚本进行调用
    csrf: {
      enable: false,
    },
  };

  config.mongoose = {
    key: 'admin',
    user: 'test',
    pass: 'test',
    host: '',
    port: '',
    replicaSet: {
      name: 'mgset-17098013',
      members: [
        {
          host: '127.0.0.1',
          port: 3717,
        },
        {
          host: '127.0.0.2',
          port: 3717,
        },
      ],
    },
    db: 'test',
  };

  // add your config here
  config.middleware = [];

  return config;
};
