import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common'

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    const user = req.user

    if (!user)
      throw new InternalServerErrorException('Object User not found on request')

    return !data ? user : user[data]
  },
)
