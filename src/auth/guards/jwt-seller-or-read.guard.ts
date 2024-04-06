import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtSellerOrReadGuard extends AuthGuard('jwt-seller-or-read') {}
