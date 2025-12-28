import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { WarehouseStatus } from 'src/generated/prisma/enums';

export class WarehouseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty({
    description: 'Status of the warehouse',
    enum: WarehouseStatus,
    example: WarehouseStatus.active,
  })
  status: WarehouseStatus;

  @Expose()
  @ApiProperty()
  created_at: string;

  @Expose()
  @ApiProperty()
  updated_at: string;

  @Expose()
  @ApiProperty()
  deleted_at: string | null;
}
