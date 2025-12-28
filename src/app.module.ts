import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { ClsModule } from 'nestjs-cls';
import { ProductModule } from './modules/product/product.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TenantGuard } from './common/guards/tenant.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { clsConfig, config, validationSchema, WinstonConfig } from './config';
import { LoggingInterceptor } from './common/interceptors';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      validationSchema,
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const winstonConfig = config.getOrThrow<WinstonConfig>('winston');
        return winstonConfig;
      },
    }),
    ClsModule.forRoot(clsConfig),
    DbModule,
    EventEmitterModule.forRoot(),
    ProductModule,
    WarehouseModule,
    InventoryModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TenantGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
