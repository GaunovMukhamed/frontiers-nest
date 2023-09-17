import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.url === '/authUser') {
      return true;
    } else {
      const authData: string[] = request.headers.authorization?.split(' ') ?? [];
      if(authData[0] === 'Bearer' && authData[1].length > 0) {
        return true;
      }
      return false;
    }
  }
}
