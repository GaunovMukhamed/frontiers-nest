import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateLobbyData } from 'src/models/general.models';
import { LobbyService } from 'src/services/lobby/lobby.service';

@Controller('lobby')
export class LobbyController {

  constructor(
    private _lobbyService: LobbyService
  ) {}

  @Get('/all')
  getAllLobbiesList(@Res() res: Response): void {
    this._lobbyService.getLobbiesList(res);
  }

  @Post('/create')
  @FormDataRequest()
  createLobby(@Req() req: Request, @Body() createLobbyInfo: CreateLobbyData, @Res() res: Response): void {
    this._lobbyService.createLobby(req, res, createLobbyInfo);
  }

  @Get('/createInfo')
  getLobbyCreateInfo(@Res() res: Response): void {
    this._lobbyService.getLobbyCreateInfo(res);
  }
}
