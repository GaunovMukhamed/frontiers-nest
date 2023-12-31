import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoginFormData } from 'src/models/general.models';
import { User } from 'src/models/user.model';
import { Request, Response } from 'express';
import { Base64 } from 'base64-string';

@Injectable()
export class AuthService {

  constructor(
    private _databaseService: DatabaseService
  ) {}

  enc = new Base64();

  authUser(loginInfo: LoginFormData, res: Response): void {
    try {
      const foundUser: User | undefined = this._databaseService.getUser(loginInfo.login);
      console.log(foundUser)
      if(foundUser) {
        if(loginInfo.password === foundUser.password) {
          res.status(HttpStatus.OK).json({ message: 'Вы успешно авторизованы' });
        } else {
          res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Неверный пароль' });
        }
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Пользователь не существует' });
      }
    } catch(error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при авторизации пользователя' })
    }
  }

  getLogin(req: Request): string {
    try {
      return this.enc.decode(req.headers['authorization'].split(' ')[1]);
    } catch(error: any) {
      return '';
    }
  }
}
