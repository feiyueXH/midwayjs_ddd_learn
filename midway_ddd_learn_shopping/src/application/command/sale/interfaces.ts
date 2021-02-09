import { ICommandBase } from '../../../infrastructure/core/application/command';

export interface ICreateOrderCommand extends ICommandBase {
  productArray: Array<{
    productId: string;
    count: number;
    price: number;
  }>;
}

export interface IAddCartItemCommand {
  userId: string;
  productId: string;
  count: number;
}

export interface IRemoveCartItemCommand {
  userId: string;
  productId: string;
}
