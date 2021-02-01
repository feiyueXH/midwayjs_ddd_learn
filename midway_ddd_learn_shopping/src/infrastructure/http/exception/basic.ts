// export interface CodeEnumType {
//   [propName: string]: CodeEnumItemType;
// }

export type CodeEnumItemType = ReadonlyArray<string>;

export const BasicExceptionCode = {
  VERIFY_FAIL: ['00001000', '校验失败'],
  VERIFY_FAIL_LEN: ['00001010', '长度校验失败'],
  VERIFY_FAIL_TYPE: ['00001020', '数据类型校验失败'],
  VERIFY_FAIL_NULL: ['00001030', '不能为空'],

  DB_FAIL: ['00002000', '数据库语句执行失败'],
  DB_FAIL_CREATE: ['00002010', '创建失败'],
  DB_FAIL_DELETE: ['00002020', '删除失败'],
  DB_FAIL_DELETE_NOTFOUND: ['00002021', '删除失败,查无数据'],
  DB_FAIL_UPDATE: ['00002030', '修改失败'],
  DB_FAIL_UPDATE_NOTFOUND: ['00002031', '修改失败,查无数据'],
  DB_FAIL_FIND: ['00002040', '查询失败'],
  DB_FAIL_UNIQUE: ['00002050', '数据唯一冲突'],
  DB_FAIL_TRANSACTION: ['00002060', '事务错误'],
  DB_FAIL_TRANSACTION_COMMIT: ['00002061', '事务提交失败'],
  DB_FAIL_TRANSACTION_BACK: ['00002062', '事务回滚失败'],
  DB_FAIL_TRANSACTION_TIMEOUT: ['00002063', '事务超时'],

  UNKNOWN_ERR: ['-1', '未知错误'], //未知错误
  SUCCESS: ['0', '成功'], //成功
} as const;

export class BasicException extends Error {
  protected map: Map<string, string>;
  protected code = '';
  protected msg = '';
  protected label = '';
  protected status = 500;

  /**
   * 构造器函数 如果子类继承了该基类，请在子类构造器中依次执行super()、this.appendMap(map)、this.check(code,msg,status)
   * @param enumItem 业务状态码
   * @param msg 错误明细
   * @param status 请求状态码
   */
  constructor(enumItem: CodeEnumItemType, msg: string, status = 500) {
    super();
    this.setMap(BasicExceptionCode);
    //进行检查赋值
    this.check(enumItem, msg, status);
  }

  // /**
  //  * 追加错误码Map,用于子类继承基类后,在构造器中执行super()后调用
  //  * @param map
  //  */
  // protected appendMap(map: Map<string, string>) {
  //   this.map = new Map<string, string>([...this.map, ...map]);
  // }

  protected setMap(codeEnum: { [propName: string]: CodeEnumItemType }): void {
    const codeArray = [];
    for (const key in codeEnum) {
      codeArray.push(codeEnum[key]);
    }
    this.map = new Map(codeArray);
  }

  /**
   * 检查错误码是否存在,存在提取错误状态码明细并赋值,如果不存在,则为未处理的错误。如果是子类，请在构造器中执行super()、super.setMap(map)后调用
   * @param enumItem 业务状态枚举项
   * @param msg 错误明细
   * @param status 请求状态码
   */
  protected check(enumItem: CodeEnumItemType, msg: string, status = 500): void {
    this.msg = msg;
    this.status = status;
    if (this.map.has(enumItem[0])) {
      this.code = enumItem[0];
      this.label = this.map.get(this.code);
    } else {
      this.code = BasicExceptionCode.UNKNOWN_ERR[0];
      this.label = this.map.get(this.code);
    }
  }

  /**
   * 获取错误状态码
   */
  public getCode(): string {
    return this.code;
  }

  //获取错误码中文描述
  public getMsg(): string {
    return this.msg;
  }

  //获取错误明细(错误明细是抛出错误时手动传入的)
  public getLabel(): string {
    return this.label;
  }

  //获取请求状态码
  public getStatus(): number {
    return this.status;
  }

  /**
   * 转字符串
   */
  public toString(): string {
    return `status:${this.status},code:${this.code},label:${this.label},msg:${this.msg}`;
  }
}
