import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { LobbyController } from './controllers/lobby/lobby.controller';
import { LobbyService } from './services/lobby/lobby.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './helpers/auth/auth.guard';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [
    AuthController,
    LobbyController
  ],
  providers: [
    DatabaseService,
    AuthService,
    LobbyService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
