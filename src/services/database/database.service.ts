import { Injectable } from '@nestjs/common';
import { RaceInfo } from 'src/models/game.models';
import { LobbyItem, Scenario } from 'src/models/general.models';
import { User } from 'src/models/user.model';
const fs = require('fs');

@Injectable()
export class DatabaseService {

  constructor() {}

  loadFile = (filename: string): any => {
    try {
      return JSON.parse(fs.readFileSync(`./src/database/${filename}.json`));
    } catch(error: any) {
      console.log(`ERROR: ${error}`)
      return [];
    }
  }

  // users
  async getUsers(): Promise<User[]> {
    return this.loadFile('users');
  }

  getUser(userLogin: string): User | undefined {
    const users: User[] = this.loadFile('users');
    console.log(users)
    return users.find((usr: User) => usr.login === userLogin);
  }

  // lobby
  async getLobbiesList(): Promise<LobbyItem[]> {
    // return await this.loadSheetRows(this.lobbiesDocId);
    return [];
  }

  async getScenarios(): Promise<Scenario[]> {
    // return await this.loadSheetRows(this.scenariosDocId);
    return [];
  }

  async createLobby(lobbyItem: LobbyItem): Promise<void> {
    // (await this.loadSheet(this.scenariosDocId)).addRow(lobbyItem as any);
  }

  // async getRacesInfo(): Promise<RaceInfo[]> {
  //   return []
  //   // return await this.connection!.fetchTable('Races') as unknown as RaceInfo[];
  // }
}
