import { IEntityDataMapper } from '@express-rest-service/database-abstraction/interfaces';
import { IRepository } from '@express-rest-service/domain/interfaces';
import { InMemoryRepository } from './in-memory.repository';

export class GenericRepository<TDomainEntity, TEntity> implements IRepository<TDomainEntity> {
  public repository: InMemoryRepository<TEntity>;
  public dataMapper: IEntityDataMapper<TDomainEntity, TEntity>;

  constructor(repository: InMemoryRepository<TEntity>, dataMapper: IEntityDataMapper<TDomainEntity, TEntity>) {
    this.repository = repository;
    this.dataMapper = dataMapper;
  }

  public async find(): Promise<TDomainEntity[]> {
    const entities = await this.repository.find();
    return entities.map((entity: TEntity) => this.dataMapper.toDomain(entity));
  }

  public async findOne(id: string): Promise<TDomainEntity> {
    const entity = await this.repository.findOne(id);
    return this.dataMapper.toDomain(entity);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result;
  }

  public async update(entity: TDomainEntity): Promise<TDomainEntity> {
    const result = await this.repository.update(this.dataMapper.toEntity(entity));
    return this.dataMapper.toDomain(result);
  }

  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    const result = await this.repository.create(this.dataMapper.toEntity(entity));
    return this.dataMapper.toDomain(result);
  }
}
