export interface LoginFormData {
  login: string;
  password: string;
}

export class ErrorBody {
  constructor (message?: string) {
    this.message = message ?? 'Ошибка!';
  }

  message: string = 'Ошибка!';
}

export class SuccessResponse {
  constructor (message?: string) {
    this.message = message ?? 'Успешно!';
  }
  message: string = 'Успешно!';
}

export interface LobbyItem {
  host: string;
  users: string[];
  status: number;
  scenario: number;
  maxPlayers: number;
}

export interface Scenario {
  id: number;
  name: string;
  info: any;
}

export interface CreateLobbyData {
  scenario: number;
  playersCount: number;
}