import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { TransactionService } from '../service';
import {
  CreateTransactionDto,
  PaginatedTransactionDto,
  TransactionDto,
  TransactionQueryDto,
} from '../dto';
import { WarehouseContextGuard } from 'src/common/guards/warehouse.guard';

@UseGuards(WarehouseContextGuard)
@ApiSecurity('tenant-key')
@Controller('inventory/:productId/transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stock transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created successfully',
    type: TransactionDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid transaction data' })
  create(@Body() data: CreateTransactionDto) {
    return this.service.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Transaction ID' })
  @ApiOkResponse({
    description: 'Transaction retrieved successfully',
    type: TransactionDto,
  })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all transactions with optional filters' })
  @ApiQuery({ type: TransactionQueryDto, required: false })
  @ApiOkResponse({
    description: 'Paginated list of transactions retrieved successfully',
    type: PaginatedTransactionDto,
  })
  list(@Query() query: TransactionQueryDto) {
    return this.service.list(query);
  }
}
