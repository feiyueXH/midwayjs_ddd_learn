// import { Types } from 'mongoose';

export class UUID {
  static randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

// export class UUID extends Types.ObjectId {
//   static randomUUID(): Types.ObjectId {
//     // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
//     //   const r = (Math.random() * 16) | 0,
//     //     v = c === 'x' ? r : (r & 0x3) | 0x8;
//     //   return v.toString(16);
//     // });

//     return Types.ObjectId();
//   }
// }

// export const MongoId = function (): Types.ObjectId {
//   return Types.ObjectId();
// };
