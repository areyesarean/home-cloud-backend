import { Module } from '@nestjs/common';
import { CloudController } from './controller/cloud.controller';

@Module({
  controllers: [CloudController],
})
export class CloudModule {}
