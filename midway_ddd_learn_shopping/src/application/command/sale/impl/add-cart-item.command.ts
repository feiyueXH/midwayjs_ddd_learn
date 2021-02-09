import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IAddCartItemCommand } from '../interfaces';

export class AddCartItemCommand
  extends CommandBase
  implements IAddCartItemCommand {
  userId: string;
  productId: string;
  count: number;

  constructor(userId: string, productId: string, count: number) {
    super();
    this.userId = userId;
    this.productId = productId;
    this.count = count;
  }
}
