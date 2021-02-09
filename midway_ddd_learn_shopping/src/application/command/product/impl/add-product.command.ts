import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IAddProductCommand } from '../interface';

export class AddProductCommand
  extends CommandBase
  implements IAddProductCommand {
  productName: string;
  price: number;
  stock: number;

  constructor(productName: string, price: number, stock: number) {
    super();

    this.productName = productName;
    this.price = price;
    this.stock = stock;
  }
}
