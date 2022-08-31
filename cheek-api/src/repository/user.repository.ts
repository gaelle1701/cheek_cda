import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User).extend({
  async createUser(user: User) {
    const createUser = userRepository.create(user);
    return await userRepository.save(createUser);
  },
  async findById(id: number) {
    return await userRepository.findOneBy({
      id,
    });
  },
});
