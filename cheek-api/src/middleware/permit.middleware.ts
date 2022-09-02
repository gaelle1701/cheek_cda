import { NextFunction, Request, Response } from 'express';

export default function permit(...permittedRoles) {
  return (req: Request, resp: Response, next: NextFunction) => {
    const user = req.user;

    if (user && permittedRoles.includes(user.role)) {
      next();
    } else {
      resp.status(403).send({
        message: 'Accès interdit à ce rôle',
      });
    }
  };
}
