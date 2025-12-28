import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventKeys } from 'src/common/event-keys';
import { TransactionService } from '../service';
import { InventoryCreatedEvent } from 'src/events';
import { TransactionType } from 'src/generated/prisma/enums';

@Injectable()
export class TransactionListener {
  constructor(private readonly service: TransactionService) {}

  @OnEvent(EventKeys.INVENTORY_CREATED)
  async handleInventoryCreated(payload: InventoryCreatedEvent) {
    const { warehouse_id, product_id, stock } = payload;
    await this.service.create({
      warehouse_id,
      product_id,
      quantity: stock,
      type: TransactionType.inbound,
    });
  }
}
