import { userRepository } from '../repository/user.repository';
import { EAccountStatus } from '../entities/User';
import { Response, Request } from 'express';

class MailerController {
  async confirm(req: Request, res: Response) {
    try {
      const accessToken = req.params.access_token;
      const user = await userRepository.findOneBy({
        token: accessToken,
      });

      if (user) {
        await userRepository.update(user.id, {
          account_status: EAccountStatus.VALID,
          token: null,
        });
        return res.send({ message: 'ok' });
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Erreur lors de la confirmation de votre email !',
      });
    }
  }
}

export default MailerController;
