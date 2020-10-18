import { v4 as uuid } from 'uuid';
import { EntityNotFoundError } from '../errors/errors';

type RepositoryEntity = {
  id?: string;
};

export class InMemoryRepository<TEntity extends RepositoryEntity> {
  private entities = new Map<string, TEntity>();
  private resource: string;

  constructor(resource: string) {
    this.resource = resource;
  }

  public async find(): Promise<TEntity[]> {
    return Array.from(this.entities.values());
  }

  public async findOne(id: string): Promise<TEntity> {
    if (this.entities.has(id)) {
      return this.entities.get(id);
    }
    throw new EntityNotFoundError(this.resource, { id });
  }

  public async delete(id: string): Promise<boolean> {
    if (this.entities.has(id)) {
      return this.entities.delete(id);
    }
    throw new EntityNotFoundError(this.resource, { id });
  }

  public async update(data: TEntity): Promise<TEntity> {
    if (this.entities.has(data.id)) {
      const entity = this.entities.get(data.id);
      return this.entities.set(data.id, Object.assign(entity, data)).get(data.id);
    }
    throw new EntityNotFoundError(this.resource, { id: data.id });
  }

  public async create(entity: TEntity): Promise<TEntity> {
    const id = uuid();
    return this.entities.set(id, { ...entity, id }).get(id);
  }
}
