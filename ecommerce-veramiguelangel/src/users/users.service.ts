import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }

  getuser(id: string) {
    return this.userRepository.getUser(id);
  }

  addUser(user: Users) {
    return this.userRepository.addUser(user);
  }

  updateuser(id: string, userNewdata: Users) {
    return this.userRepository.updateUser(id, userNewdata);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
