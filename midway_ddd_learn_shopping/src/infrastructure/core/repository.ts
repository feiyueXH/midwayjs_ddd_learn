// import { IAggregateRoot } from './aggregateRoot';
// import { DTO } from './base';

// export interface IRepository<TAggregate extends IAggregateRoot> {
//   add(entity: TAggregate): Promise<void>;
//   get(dto: DTO): Promise<TAggregate>;
//   update(entity: TAggregate): Promise<void>;
//   remove(entity: TAggregate): Promise<void>;
// }

// export abstract class Repository<TAggregate extends IAggregateRoot>
//   implements IRepository<TAggregate> {
//   public abstract add(entity: TAggregate): Promise<void>;
//   public abstract get(dto: DTO): Promise<TAggregate>;
//   public abstract update(entity: TAggregate): Promise<void>;
//   public abstract remove(entity: TAggregate): Promise<void>;
// }
