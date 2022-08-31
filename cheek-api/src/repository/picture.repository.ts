import { AppDataSource } from '../config/data-source';
import { Picture } from '../entities/Picture';

export const pictureRepository = AppDataSource.getRepository(Picture).extend({
  async createPicture(product: Picture) {
    const createPicture = pictureRepository.create(product);
    return await pictureRepository.save(createPicture);
  },
  async findBydId(id: number) {
    return await pictureRepository.findOneBy({
      id,
    });
  },
});
