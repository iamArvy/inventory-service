import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto';
import { TransactionType } from 'src/generated/prisma/enums';

export enum TransactionSortBy {
  QUANTITY = 'quantity',
  DATE = 'createdAt',
}

export class TransactionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: TransactionSortBy,
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsEnum(TransactionSortBy)
  sort_by?: TransactionSortBy;

  @ApiPropertyOptional({ description: 'id of the warehouse' })
  @IsOptional()
  @IsUUID()
  warehouse_id?: string;

  @ApiPropertyOptional({ description: 'id of the product' })
  @IsOptional()
  @IsUUID()
  product_id?: string;

  @IsEnum(TransactionType, {
    message: 'Transaction type must be either active or inactive',
  })
  @ApiPropertyOptional({
    description: 'Type of transaction',
    enum: TransactionType,
    example: TransactionType.inbound,
  })
  type: TransactionType;
}
