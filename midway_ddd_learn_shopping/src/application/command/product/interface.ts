import { ICommandBase } from '../../../infrastructure/core/application/command';

export interface IAddProductCommand extends ICommandBase {
  productName: string;
  price: number;
  stock: number;
}

export interface IUpdateProductCommand extends ICommandBase {
  productId: string;
  price?: number;
  stock?: number;
  productName?: string;
}

export interface IRemoveProductCommand extends ICommandBase {
  productId: string;
}
