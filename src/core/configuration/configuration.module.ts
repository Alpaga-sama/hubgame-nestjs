import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AppConfig from './app.config';
import DatabaseConfig from './database.config';
import SwaggerConfig from './swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, SwaggerConfig, DatabaseConfig],
      isGlobal: true,
    }),
  ],
})
export class ConfigurationModule {}
