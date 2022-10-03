import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { EAccountStatus, User } from '../entities/User';
import { userRepository } from '../repository/user.repository';
import sendMail from '../helpers/mailer';
import logger from '../config/winston';
import { addressRepository } from '../repository/address.repository';

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );
      await userRepository.createUser({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        token,
      });

      sendMail(req.body.email, token);

      return res.status(200).send({
        message:
          'Votre inscription a bien été enregistée! Vérrifiez vos mails pour confirmez votre inscription!',
      });
    } catch (error) {
      logger.error("signup user", error)
      return res.status(400).send({
        message: 'Cet email existe déjà!',
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await userRepository.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user.account_status === EAccountStatus.PENDING) {
        return res.status(400).send({
          message:
            'Merci de valider la confirmation envoyée par email avant de vous connecter !',
        });
      }

      const isValidPassword = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!isValidPassword) {
        return res.status(400).send({
          message: "Le mot de passe ou l'email est invalide!",
        });
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );
      return res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accessToken,
        message: 'Vous êtes connecté(e)!',
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await userRepository.findById(req.user.id);
      return res.send(user);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      if(req.body.address) {
        const createAddress = await addressRepository.createAddress(req.body.address)
        if (createAddress) {
          await userRepository.update(req.params.id, {
            address: createAddress
          })
        }
      }

      await userRepository.update(req.params.id, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        phone: req.body.phone,
      //  address: req.body.address
      });

      return res.status(200).send({
        message: 'Votre profile a bien été mis à jour!',
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
}

export default AuthController;
