import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IRemoveCartItemCommand } from '../interfaces';

export class RemoveCartItemCommand
  extends CommandBase
  implements IRemoveCartItemCommand {
  userId: string;
  productId: string;

  constructor(userId: string, productId: string) {
    super();
    this.userId = userId;
    this.productId = productId;
  }
}
