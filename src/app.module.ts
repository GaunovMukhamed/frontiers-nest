import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    DatabaseService,
    AuthService
  ],
})
export class AppModule {}
