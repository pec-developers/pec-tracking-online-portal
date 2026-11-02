import { Module } from '@nestjs/common';
import { EndProgramController } from './end-program.controller.js';
import { EndProgramService } from './end-program.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [EndProgramController],
  providers: [EndProgramService],
  exports: [EndProgramService],
})
export class EndProgramModule {}
