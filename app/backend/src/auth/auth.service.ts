import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultUsers();
  }

  private async seedDefaultUsers() {
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('password123', salt);

    const defaultUsers = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        username: 'admin',
        name: 'System Administrator',
        role: Role.ADMIN,
        passwordHash: hash,
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        username: 'principal',
        name: 'Dr. V. Narayanan (Principal)',
        role: Role.PRINCIPAL,
        passwordHash: hash,
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        username: 'hod_cse',
        name: 'Dr. Priya Shankar (HOD)',
        role: Role.HOD,
        department: 'CSE',
        passwordHash: hash,
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        username: 'coordinator1',
        name: 'Prof. Anitha R. (Class Coordinator)',
        role: Role.CLASS_COORDINATOR,
        department: 'CSE',
        passwordHash: hash,
      },
      {
        id: '55555555-5555-5555-5555-555555555555',
        username: 'mentor1',
        name: 'Dr. Ramesh Kumar (Mentor)',
        role: Role.MENTOR,
        department: 'CSE',
        passwordHash: hash,
      },
      {
        id: '66666666-6666-6666-6666-666666666666',
        username: 'faculty1',
        name: 'Prof. Suresh Balan (Faculty)',
        role: Role.FACULTY,
        department: 'CSE',
        passwordHash: hash,
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        username: '111422104001',
        name: 'Aravind Swaminathan (Student)',
        role: Role.STUDENT,
        department: 'CSE',
        passwordHash: hash,
      },
      {
        id: '88888888-8888-8888-8888-888888888888',
        username: 'parent1',
        name: 'Mr. Swaminathan (Parent)',
        role: Role.PARENT,
        passwordHash: hash,
      },
    ];

    for (const u of defaultUsers) {
      await this.prisma.user.upsert({
        where: { username: u.username },
        update: {},
        create: u,
      });
    }
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existing) {
      throw new BadRequestException(`Username '${dto.username}' already exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        name: dto.name,
        passwordHash,
        role: (dto.role as Role) ?? Role.STUDENT,
        department: dto.department,
      },
    });

    return {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      department: newUser.department,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      department: user.department,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        department: user.department,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      department: user.department,
      createdAt: user.createdAt,
    };
  }

  async listRolesAndUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        username: true,
        name: true,
        role: true,
        department: true,
      },
    });
    return users;
  }
}
