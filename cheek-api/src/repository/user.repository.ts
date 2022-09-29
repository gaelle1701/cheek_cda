import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { DeepPartial } from 'typeorm';

export const userRepository = AppDataSource.getRepository(User).extend({
  async createUser(user: DeepPartial<User>) {
    const createUser = userRepository.create(user);
    return await userRepository.save(createUser);
  },
  async findById(id: number) {
    return await userRepository.findOne({
      where:{
        id,
      },
      relations:{
        address: true
      }
    });
  },
});
