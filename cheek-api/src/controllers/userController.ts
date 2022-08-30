import { Request, Response } from 'express';
import { userRepository } from '../repository/user.repository';

class UserController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body) {
        res.status(400).send({
          message: 'Content can not be empty!',
        });
        return;
      }
      const saveUser = await userRepository.createUser(req.body);
      return res.send(saveUser);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const getUsers = await userRepository.find({
        relations: { addresses: true },
      });
      return res.send(getUsers);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userRepository.findById(+req.params.id);
      if (!user) {
        return res.status(400).send({
          message: "The user doesn't exist",
        });
      }
      return res.send(user);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updateUser = await userRepository.update(userId, req.body);

      if (updateUser.affected === 1) {
        return res.status(200).send({
          message: 'This user with id= ' + userId + ' has been updated',
        });
      }
      return res.send(updateUser);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async destroy(req: Request, res: Response) {
    const user = await userRepository.findById(+req.params.id);
    try {
      if (!user) {
        return res.status(400).send({
          message: "This user doesn't exist",
        });
      }

      const deleteUser = await userRepository.delete(user.id);
      if (deleteUser.affected === 1) {
        return res.status(200).send({
          message: 'This user with id= ' + user.id + ' has been deleted',
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Could not delete User with id=' + user.id,
      });
    }
  }
}

export default new UserController();
