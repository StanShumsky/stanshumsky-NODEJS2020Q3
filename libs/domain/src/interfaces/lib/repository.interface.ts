export interface IRepository<TEntity> {
  find(): Promise<TEntity[]>;
  findOne(id: string): Promise<TEntity>;
  delete(id: string): Promise<boolean>;
  update(data: TEntity): Promise<TEntity>;
  create(data: TEntity): Promise<TEntity>;
}
