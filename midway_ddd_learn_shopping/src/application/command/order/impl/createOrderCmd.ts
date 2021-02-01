import { CommandBase } from '../../../../infrastructure/core/cqrs/command';
import { ICreateOrderCmd } from '../createOrderCmd';

export class CreateOrderCmd extends CommandBase implements ICreateOrderCmd {
  createDate: Date;
}
