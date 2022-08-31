import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repository/user.repository';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers.authorization;

  if (headers) {
    // split headers to keep token only
    const token = headers.split('Bearer ')[1];
    const decodedToken = await (<jwt.UserId>(
      jwt.verify(token, process.env.JWT_SECRET)
    ));
    req.user = await userRepository.findById(decodedToken.id);
  }

  next();
}

export default authMiddleware;
