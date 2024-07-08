import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { authorization }: any = req.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('plz provide token');
      }
      const authToken = authorization;
      const resp = await this.authService.validateToken(authToken);
      req.decodedData = resp;
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
