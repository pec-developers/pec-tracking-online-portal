import { Module } from '@nestjs/common';
import { MentoringController } from './mentoring.controller.js';
import { MentoringService } from './mentoring.service.js';

@Module({
  controllers: [MentoringController],
  providers: [MentoringService],
  exports: [MentoringService],
})
export class MentoringModule {}

