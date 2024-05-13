import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.save(createUserDto);
    return newUser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 1) find the element index that we want to update
    const userToUodate = await this.findUserById(id);
    if (!userToUodate) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    // 2) update the element
    const updatedUser = await this.userRepository.save({ ...userToUodate, ...updateUserDto });
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
