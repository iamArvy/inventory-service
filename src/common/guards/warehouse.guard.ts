import { CanActivate, Injectable, ForbiddenException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from '../request-context';

@Injectable()
export class WarehouseContextGuard implements CanActivate {
  constructor(private readonly cls: ClsService<RequestContext>) {}

  canActivate(): boolean {
    const { warehouseId } = this.cls.get();
    if (warehouseId) {
      return true;
    }

    throw new ForbiddenException(
      'Access denied: request must include warehouse identifier',
    );
  }
}
