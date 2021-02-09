import { CommandBase } from '../../../../infrastructure/core/application/command';
import { ICreateOrderCommand } from '../interfaces';

interface IProduct {
  productId: string;
  count: number;
  price: number;
}

export class CreateOrderCommand
  extends CommandBase
  implements ICreateOrderCommand {
  productArray: IProduct[];

  constructor(productArray: Array<IProduct>) {
    super();
    this.productArray = productArray;
  }
}
