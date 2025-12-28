import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventKeys } from 'src/common/event-keys';
import { InventoryService } from '../service';
import { TransactionCreatedEvent } from 'src/events';

@Injectable()
export class InventoryListener {
  constructor(private readonly service: InventoryService) {}
  @OnEvent(EventKeys.TRANSACTION_CREATED)
  async handleTransactionCreated(payload: TransactionCreatedEvent) {
    const { warehouse_id, product_id, quantity, type } = payload;
    await this.service.updateStock(warehouse_id, product_id, type, quantity);
  }
}
