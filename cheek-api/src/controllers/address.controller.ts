import { Request, Response } from 'express';
import { addressRepository } from '../repository/address.repository';

class AddressController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const savedAddress = await addressRepository.createAddress(req.body);
      return res.send(savedAddress);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getAddresses(req: Request, res: Response) {
    try {
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
      const address = await addressRepository.findById(+req.params.id);
      if (!address) {
        return res.status(400).send({
          message: "This addresses doesn't exist",
        });
      }
      return res.send(address);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const address = await addressRepository.findById(+req.params.id);
      if (!address) {
        return res.status(400).send({
          message: "This address doesn't exist !",
        });
      }

      const updateAddress = await addressRepository.save(
        Object.assign(address, req.body),
      );
      if (updateAddress.affected === 1) {
        return res.status(200).send({
          message: 'The address with id= ' + address.id + ' has been updated !',
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
    try {
      const address = await addressRepository.findById(+req.params.id);
      if (!address) {
        return res.status(400).send({
          message: "This address doesn't exist",
        });
      }

      const deleteAddress = await addressRepository.delete(address.id);
      if (deleteAddress.affected === 1) {
        return res.status(200).send({
          message: `The address with id=${address.id} has been deleted successfully !`,
        });
      }

      return res.send(deleteAddress);
    } catch (error) {
      return res.status(500).send({
        message: `Could not delete address with id=${req.params.id}`,
      });
    }
  }
}

export default AddressController;
