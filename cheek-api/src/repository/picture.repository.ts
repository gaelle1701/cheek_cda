import { DeepPartial } from 'typeorm';

import { AppDataSource } from '../config/data-source';
import { Picture } from '../entities/Picture';

export const pictureRepository = AppDataSource.getRepository(Picture).extend({
  async createPicture(picture: DeepPartial<Picture>) {
    const createPicture = pictureRepository.create(picture);
    return await pictureRepository.save(createPicture);
  },
  async findBydId(id: number) {
    return await pictureRepository.findOne({
      where: {id},
      relations: [
        'product'
      ]
    });
  },
});
