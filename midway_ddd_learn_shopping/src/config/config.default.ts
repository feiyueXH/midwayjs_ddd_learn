import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  config.mongoose = {
    user: '',
    pass: '',
    host: 'localhost',
    port: '27017',
    replicaSet: {
      name: '',
      members: [
        // {
        //   host: 'localhost',
        //   port: '27017',
        // },
        // {
        //   host: 'localhost',
        //   port: '27027',
        // },
        // {
        //   host: 'localhost',
        //   port: '27037',
        // },
      ],
    },
    db: 'test',
  };

  // add your config here
  config.middleware = [];

  return config;
};
