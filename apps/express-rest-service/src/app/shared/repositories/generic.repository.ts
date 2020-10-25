import { Collection, Document, Types } from 'mongoose';
import { EntityNotFoundError } from '../errors/errors';
import { IEntityDataMapper } from '../interfaces/data-mapper.interface';
import { IRepository } from './repository.interface';
const { ObjectId } = Types;

export class GenericRepository<TDomainEntity, TEntity extends Document> implements IRepository<TDomainEntity> {
  constructor(public repository: Collection, public dataMapper: IEntityDataMapper<TDomainEntity, TEntity>) {}

  public async create(data: TDomainEntity): Promise<TDomainEntity> {
    const entity = this.dataMapper.toEntity(data);
    await this.repository.insertOne(entity);
    return this.dataMapper.toDomain(entity.toObject());
  }

  public async findOne(id: string): Promise<TDomainEntity> {
    const entity = await this.repository.findOne({ _id: new ObjectId(id) });

    if (entity) {
      return this.dataMapper.toDomain(entity);
    }

    throw new EntityNotFoundError(this.repository.name, { id });
  }

  public async find(): Promise<TDomainEntity[]> {
    const entities = await this.repository.find({}).toArray();
    return entities.map((entity: TEntity) => this.dataMapper.toDomain(entity));
  }

  public async update(id: string, domainEntity: TDomainEntity): Promise<TDomainEntity> {
    const entity = this.dataMapper.toEntity(domainEntity);
    await this.repository.replaceOne({ _id: new ObjectId(id) }, entity.toObject());
    if (entity) {
      return this.dataMapper.toDomain(entity.toObject());
    }
    throw new EntityNotFoundError(this.repository.name, { id });
  }

  public async delete(id: string): Promise<boolean> {
    const { result } = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result.ok > 0;
  }
}
