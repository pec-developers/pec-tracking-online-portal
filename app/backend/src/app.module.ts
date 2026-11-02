import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { StudentModule } from './student/student.module.js';
import { AcademicModule } from './academic/academic.module.js';
import { MentoringModule } from './mentoring/mentoring.module.js';
import { EndProgramModule } from './end-program/end-program.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StudentModule,
    AcademicModule,
    MentoringModule,
    EndProgramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
