import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IUpdateProductCommand } from '../interface';

export class UpdateProductCommand
  extends CommandBase
  implements IUpdateProductCommand {
  productId: string;
  price?: number;
  stock?: number;
  productName?: string;
}
