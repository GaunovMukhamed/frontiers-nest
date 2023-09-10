import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginFormData } from 'src/models/general.models';
import { AuthService } from 'src/services/auth/auth.service';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller()
export class AuthController {

  constructor(private readonly appService: AuthService) {}

  @Post('/authUser')
  @FormDataRequest()
  getHello(@Body() loginInfo: LoginFormData, @Res() res: Response): void {
    this.appService.authUser(loginInfo, res);
  }
}
