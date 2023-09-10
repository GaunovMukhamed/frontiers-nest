import { Injectable } from '@nestjs/common';
import { GristDocAPI } from "grist-api";
import { RaceInfo } from 'src/models/game.models';
import { User } from 'src/models/user.model';

@Injectable()
export class DatabaseService {

  constructor() {
    this.connectToBase();
  }

  connection: GristDocAPI | undefined;
  databaseUrl: string = "https://docs.getgrist.com/uCLARLTenEjf/WebRpg";
  gristApiKey: string = "a8e3f544ef8259127973ecf18724629f37bc3763";

  connectToBase(): void {
    this.connection = new GristDocAPI(this.databaseUrl, {apiKey: this.gristApiKey});
  }

  //users
  async getUsers(): Promise<User[]> {
    return await this.connection!.fetchTable('Users') as unknown as User[];
  }

  async getUser(userLogin: string): Promise<User> {
    console.log(userLogin)
    return (await this.connection!.fetchTable('Users') as unknown as User[]).find((usr: User) => usr.login === userLogin);
  }

  // async addUser(login: string, hash: string): Promise<void> {
  //   await this.connection!.addRecords('Users', [{ login, hash }]);
  // }

  //

  async getRacesInfo(): Promise<RaceInfo[]> {
    return await this.connection!.fetchTable('Races') as unknown as RaceInfo[];
  }
}
