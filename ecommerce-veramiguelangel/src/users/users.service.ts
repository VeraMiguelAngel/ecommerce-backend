import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }

  getuser(id: string) {
    return this.userRepository.getUser(id);
  }

  addUser(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.userRepository.addUser(user);
  }

  updateuser(id: string, userNewdata: any) {
    return this.userRepository.updateUser(id, userNewdata);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
