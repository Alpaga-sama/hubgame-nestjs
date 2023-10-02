import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule, SharedModule, ModulesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
