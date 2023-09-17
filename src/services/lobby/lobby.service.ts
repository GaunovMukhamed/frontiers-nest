import { HttpStatus, Injectable } from '@nestjs/common';
import { LobbyItem } from 'src/models/general.models';
import { DatabaseService } from '../database/database.service';
import { Response } from 'express';

@Injectable()
export class LobbyService {

  constructor(
    private _databaseService: DatabaseService
  ) {}

  async getLobbiesList(res: Response): Promise<void> {
    try {
      const allLobbies: LobbyItem[] | undefined = await this._databaseService.getLobbiesList();
      if(allLobbies) {
        res.status(HttpStatus.OK).json(allLobbies)
      } else {
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: 'Ошибка получения списка лобби' })
      }
    } catch(error: any) {
      console.log(error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при получении списка лобби' })
    }
  }
}
