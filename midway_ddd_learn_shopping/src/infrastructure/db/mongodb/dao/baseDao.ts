export interface BaseDao {
  /**
   * 找不到如何在依赖注入时传递构造方法参数,只能实例化后手动初始化
   * @param Model
   */
  init(Model): void;

  /**
   * 使用 Model 的 静态方法 create() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  create(obj: any): Promise<any>;

  /**
   * 使用 Model save() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  save(obj): Promise<any>;

  /**
   * 列表查询
   *
   * @param condition 查找条件
   * @param constraints
   * @returns {Promise}
   */
  list(condition, constraints): Promise<any>;

  /**
   * 单条查询
   *
   * @param condition
   * @param constraints
   * @returns {Promise}
   */
  get(condition, constraints): Promise<any>;

  /**
   * 更新 docs
   *
   * @param condition 查找条件
   * @param updater 更新操作
   * @returns {Promise}
   */
  update(condition, updater): Promise<any>;

  /**
   * 移除 doc
   *
   * @param condition 查找条件
   * @returns {Promise}
   */
  remove(obj: any): Promise<any>;
}
