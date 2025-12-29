import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from '../service';
import { CreateTransactionDto, TransactionQueryDto } from '../dto';
import { WarehouseContextGuard } from 'src/common/guards/warehouse.guard';
import { TRANSACTION_CONTROLLER, TRANSACTION_ENDPOINTS } from '../constants';
import {
  CreateTransactionDocs,
  GetTransactionDocs,
  ListTransactionDocs,
  TransactionControllerDocs,
} from '../docs';

@TransactionControllerDocs()
@UseGuards(WarehouseContextGuard)
@Controller(TRANSACTION_CONTROLLER.basePath)
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @CreateTransactionDocs()
  @Post(TRANSACTION_ENDPOINTS.CREATE.path)
  create(@Body() data: CreateTransactionDto) {
    return this.service.create(data);
  }

  @GetTransactionDocs()
  @Get(TRANSACTION_ENDPOINTS.GET.path)
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @ListTransactionDocs()
  @Get(TRANSACTION_ENDPOINTS.LIST.path)
  list(@Query() query: TransactionQueryDto) {
    return this.service.list(query);
  }
}
