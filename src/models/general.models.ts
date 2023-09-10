export interface LoginFormData {
  login: string,
  password: string
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
  id: number,
  host: string,
  users: string[],
  status: number
}