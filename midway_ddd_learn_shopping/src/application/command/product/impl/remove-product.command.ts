import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IRemoveProductCommand } from '../interface';

export class RemoveProductCommand
  extends CommandBase
  implements IRemoveProductCommand {
  productId: string;
  constructor(productId: string) {
    super();
    this.productId = productId;
  }
}
