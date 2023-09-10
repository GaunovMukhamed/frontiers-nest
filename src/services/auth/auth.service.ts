import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoginFormData } from 'src/models/general.models';
import { User } from 'src/models/user.model';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private _databaseService: DatabaseService
  ) {}

  async authUser(loginInfo: LoginFormData, res: Response): Promise<void> {
    const foundUser: User | undefined = await this._databaseService.getUser(loginInfo.login);
    if(foundUser) {
      if(loginInfo.password === foundUser.password) {
        res.status(HttpStatus.OK).json({
          message: 'Вы успешно авторизованы',
          login: loginInfo.login
        });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Неверный пароль' })
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Пользователь не существует' })
    }
  }
}
