import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Observable } from 'rxjs'

import { META_ROLES } from 'src/auth/decorators/role-protected/role-protected.decorator'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      ctx.getHandler(),
    )

    if (!validRoles) return true
    if (validRoles.length === 0) return true

    const req = ctx.switchToHttp().getRequest()
    const user = req.user as User

    if (!user) throw new BadRequestException('User not found')

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true
    }

    throw new ForbiddenException(
      `User ${user.username} must have a valid role for this route`,
    )
  }
}
