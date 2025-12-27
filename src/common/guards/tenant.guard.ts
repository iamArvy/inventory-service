import { CanActivate, Injectable, ForbiddenException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from '../request-context';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly cls: ClsService<RequestContext>) {}

  canActivate(): boolean {
    const { tenantId } = this.cls.get();
    if (tenantId) {
      return true;
    }

    throw new ForbiddenException(
      'Access denied: request must include tenant identifier',
    );
  }
}
