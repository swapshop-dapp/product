import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtHostOrReadGuard extends AuthGuard('jwt-host-or-read') {}
