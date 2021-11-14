import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudModule } from './cloud/cloud.module';

@Module({
  imports: [CloudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
