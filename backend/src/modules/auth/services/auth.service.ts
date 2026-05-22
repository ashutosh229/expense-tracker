import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { MailService } from '../../../infrastructure/mail/mail.service';
import { UsersService } from '../../users/services/users.service';
import { AuthUser } from '../../users/interfaces/auth-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = this.normalizeEmail(dto.email);
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser?.isEmailVerified) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const emailVerificationToken = randomBytes(32).toString('hex');
    const emailVerificationExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    if (existingUser) {
      await this.usersService.update(existingUser.id, {
        passwordHash,
        isEmailVerified: false,
        emailVerificationToken,
        emailVerificationExpiresAt,
      });
    } else {
      await this.usersService.create({
        email,
        passwordHash,
        emailVerificationToken,
        emailVerificationExpiresAt,
      });
    }

    await this.mailService.sendVerificationEmail(email, emailVerificationToken);

    return {
      message: 'Registration successful. Please verify your email address.',
    };
  }

  async verifyEmail(token: string) {
    if (!token) {
      throw new BadRequestException('Verification token is required.');
    }

    const user = await this.usersService.findByVerificationToken(token);

    if (!user) {
      throw new BadRequestException('Invalid verification token.');
    }

    if (
      !user.emailVerificationExpiresAt ||
      user.emailVerificationExpiresAt.getTime() < Date.now()
    ) {
      throw new BadRequestException('Verification token has expired.');
    }

    await this.usersService.update(user.id, {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpiresAt: null,
    });

    return {
      message: 'Email verified successfully. You can now log in.',
    };
  }

  async login(dto: LoginDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email before login.');
    }

    return {
      accessToken: await this.signToken(user),
      user: this.toAuthUser(user),
    };
  }

  async validateJwtPayload(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.isEmailVerified) {
      throw new UnauthorizedException('Invalid authentication token.');
    }

    return user;
  }

  toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
    };
  }

  private signToken(user: User) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }
}
