import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLobbyData, LobbyItem, Scenario } from 'src/models/general.models';
import { DatabaseService } from '../database/database.service';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LobbyService {

  constructor(
    private _databaseService: DatabaseService,
    private _authService: AuthService
  ) {}

  async getLobbiesList(res: Response): Promise<void> {
    try {
      const allLobbies: LobbyItem[] | undefined = await this._databaseService.getLobbiesList();
      if(allLobbies) {
        res.status(HttpStatus.OK).json(allLobbies);
      } else {
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ message: 'Ошибка получения списка лобби' });
      }
    } catch(error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при получении списка лобби' });
    }
  }

  async getLobbyCreateInfo(res: Response): Promise<void> {
    try {
      const allScenarios: Scenario[] | undefined = await this._databaseService.getScenarios();
      res.status(HttpStatus.OK).json({
        scenarios: allScenarios,
        playersCountOptions: [1,2,3,4]
      });
    } catch(error: any) {
      console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при получении данных для создания лобби' });
    }
  }

  async createLobby(req: Request, res: Response, createLobbyInfo: CreateLobbyData): Promise<void> {
    try {
      const login: string = this._authService.getLogin(req);
      const newLobby: LobbyItem = {
        host: login,
        users: [login],
        status: 0,
        scenario: createLobbyInfo.scenario,
        maxPlayers: createLobbyInfo.playersCount
      };
      await this._databaseService.createLobby(newLobby);
      res.status(HttpStatus.OK).json({ message: 'Лобби создано' });
    } catch(error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Ошибка при создании лобби' });
    }
  }
}
