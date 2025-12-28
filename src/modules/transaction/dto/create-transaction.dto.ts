import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsUUID } from 'class-validator';
import { TransactionType } from 'src/generated/prisma/enums';

export class CreateTransactionDto {
  @IsUUID()
  @ApiProperty()
  warehouse_id: string;

  @IsUUID()
  @ApiProperty()
  product_id: string;

  @IsInt()
  @ApiProperty()
  quantity: number;

  @IsEnum(TransactionType, {
    message: 'Transaction type is either inbound or outbound',
  })
  @ApiProperty({
    enum: TransactionType,
    description: 'The type of transaction being made',
    example: TransactionType.inbound,
  })
  type: TransactionType;
}
