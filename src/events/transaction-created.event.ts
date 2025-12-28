import { TransactionType } from 'src/generated/prisma/enums';

export class TransactionCreatedEvent {
  constructor(
    public readonly transaction_id: string,
    public readonly warehouse_id: string,
    public readonly product_id: string,
    public readonly quantity: number,
    public readonly type: TransactionType,
  ) {}
}
