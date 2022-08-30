import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';

class AddressController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
        return;
      }
      // get connection instance to db in app.ts
      const addressRepository = AppDataSource.getRepository(Address);
      const createAddress = addressRepository.create(req.body);

      const saveAddress = await addressRepository.save(createAddress);
      return res.send(saveAddress);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getAddresses(req: Request, res: Response) {
    try {
      // get connection instance to db in app.ts
      const addressRepository = AppDataSource.getRepository(Address);
      const getAddresses = await addressRepository.find();

      return res.send(getAddresses);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const addressRepository = AppDataSource.getRepository(Address);
      const getById = await addressRepository.findOneBy({
        id: parseInt(req.params.id, 10),
      });
      if (!getById) {
        return res.status(400).send({
          message: "This addresse doesn't exist",
        });
      }
      return res.send(getById);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const addressId = req.params.id;

      // if(!categoryId){
      //     return res.status(400).send({
      //         message: "This category doesn't exist"
      //     })
      // };

      const addressRepository = AppDataSource.getRepository(Address);
      const updateAddress = await addressRepository.update(addressId, req.body);

      if (updateAddress.affected === 1) {
        return res.status(200).send({
          message: 'This address with id= ' + addressId + ' has been updated',
        });
      }
      return res.send(updateAddress);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const addressId = req.params.id;

    try {
      if (!addressId) {
        return res.status(400).send({
          message: "This address doesn't exist",
        });
      }

      const addressRepository = AppDataSource.getRepository(Address);
      const deleteAddress = await addressRepository.delete(addressId);

      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: 'This address with id= ' + addressId + ' has been deleted',
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete address with id= ' + addressId,
      });
    }
  }
}

export default new AddressController();
