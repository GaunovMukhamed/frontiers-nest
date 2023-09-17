import { Injectable } from '@nestjs/common';
import { RaceInfo } from 'src/models/game.models';
import { LobbyItem, Scenario } from 'src/models/general.models';
import { User } from 'src/models/user.model';
import { google } from 'googleapis';
import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

@Injectable()
export class DatabaseService {

  constructor() {}

  usersDocId: string = '14Z6F_aXavAJdHe_FwZmVEqYLAcIOkgQMwKADPS5kPYY';
  lobbiesDocId: string = '1EamewYN54MDBfppO8dz-qgGbXMXw3qc7toIJK9EJLS0';
  scenariosDocId: string = '15DyKnJ2zXTukQc4kMvdNzLZtdgbznj9Rc_iDWjYeDuM';

  async loadSheetRows(sheetId: string): Promise<any[]> {
    const auth: any = new google.auth.GoogleAuth({
      keyFile: './google-auth.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
    const doc: GoogleSpreadsheet = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    return this.rowsToArray(doc.sheetsByIndex[0]);
  }

  async rowsToArray(sheet: GoogleSpreadsheetWorksheet): Promise<any[]> {
    const rows: GoogleSpreadsheetRow[] = await sheet.getRows();
    if(rows.length > 0) {
      const headers: string[] = rows[0]._worksheet.headerValues;
      const result: any[] = [];
      rows.map((row: GoogleSpreadsheetRow) => {
        const convertedRow: any = {};
        headers.map((headerName: string, index: number) => {
          convertedRow[headerName] = JSON.parse(JSON.stringify(row.get(headerName)));
        });
        result.push(convertedRow);
      });
      return result;
    }
    return [];
  }

  // users
  async getUsers(): Promise<User[]> {
    return this.loadSheetRows(this.usersDocId);
  }

  async getUser(userLogin: string): Promise<User> {
    const users: User[] = await this.loadSheetRows(this.usersDocId);
    return users.find((usr: User) => usr.login === userLogin);
  }

  // lobby
  async getLobbiesList(): Promise<LobbyItem[]> {
    return await this.loadSheetRows(this.lobbiesDocId);
  }

  async getScenarios(): Promise<Scenario[]> {
    return await this.loadSheetRows(this.scenariosDocId);
  }

  // async getRacesInfo(): Promise<RaceInfo[]> {
  //   return []
  //   // return await this.connection!.fetchTable('Races') as unknown as RaceInfo[];
  // }
}
