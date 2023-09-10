import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { LobbyService } from 'src/services/lobby/lobby.service';

@Controller('lobby')
export class LobbyController {

  constructor(
    private _lobbyService: LobbyService
  ) {}

  @Get('/all')
  getHello(@Res() res: Response): void {
    this._lobbyService.getLobbiesList(res);
  }
}
