import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { extension } from 'prisma-paginate';
import { prismaTenantFactory } from './prisma-tenant.factory';
import { ClsService } from 'nestjs-cls';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';
import { DBConfig } from 'src/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // xprisma = this.$extends(extension);

  constructor(
    private readonly cls: ClsService,
    config: ConfigService,
  ) {
    const db = config.getOrThrow<DBConfig>('db');
    const adapter = new PrismaPg(db);
    super({
      log: ['query'],
      adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  get instance(): PrismaService {
    const tenantId = this.cls.get<string>('tenantId');
    return prismaTenantFactory(this, tenantId);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
