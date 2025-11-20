/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNopassword }) => userNopassword);
  }

  async getUser(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetail: {
            products: true,
          },
        },
      },
    });
    if (!user)
      throw new NotFoundException(`No se encontró al usuario con id: ${id}`);

    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async addUser(user: Users): Promise<Omit<Users, 'password'>> {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userNoPassword } = newUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Users): Promise<Omit<Users, 'password'>> {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser)
      throw new NotFoundException(`No se encontró al usuario con id: ${id}`);
    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }

  async deleteUser(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`No se encontró al usuario con id: ${id}`);
    await this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(
        `No se encontró al usuario con email: ${email}`,
      );
    return user;
  }
}
