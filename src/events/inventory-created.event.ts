export class InventoryCreatedEvent {
  constructor(
    public readonly inventory_id: string,
    public readonly warehouse_id: string,
    public readonly product_id: string,
    public readonly stock: number,
  ) {}
}
