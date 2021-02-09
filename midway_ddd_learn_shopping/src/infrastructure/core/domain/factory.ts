import { AggregateRoot } from './aggregate-root';

export interface IFactory<TAggregateRoot extends AggregateRoot> {
  create(): TAggregateRoot;
}

export abstract class Factory<TAggregateRoot extends AggregateRoot>
  implements IFactory<TAggregateRoot> {
  abstract create(): TAggregateRoot;
}
