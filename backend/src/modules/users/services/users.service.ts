import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findById(id: string) {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  findByVerificationToken(token: string) {
    return this.usersRepository.findByVerificationToken(token);
  }

  create(data: Prisma.UserCreateInput) {
    return this.usersRepository.create(data);
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return this.usersRepository.update(id, data);
  }
}
