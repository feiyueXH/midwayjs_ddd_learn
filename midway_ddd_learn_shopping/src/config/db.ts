export const db = {
  name: 'admin',
  url:
    'dds-wz9b32a48ded8e341125-pub.mongodb.rds.aliyuncs.com:3717,dds-wz9b32a48ded8e342993-pub.mongodb.rds.aliyuncs.com',
  username: 'lzy',
  password: 'lzy123456',
  replicaSet: {
    name: 'mgset-17098013',
    members: [
      {
        host: 'dds-wz9b32a48ded8e341125-pub.mongodb.rds.aliyuncs.com',
        port: 3717,
      },
      {
        host: 'dds-wz9b32a48ded8e342993-pub.mongodb.rds.aliyuncs.com',
        port: 3717,
      },
    ],
  },
};
// mongodb://stjy11111:stjy11111@dds-wz9b32a48ded8e341125-pub.mongodb.rds.aliyuncs.com:3717,dds-wz9b32a48ded8e342993-pub.mongodb.rds.aliyuncs.com:3717/1000?replicaSet=mgset-17098013&readPreference=secondaryPreferred
