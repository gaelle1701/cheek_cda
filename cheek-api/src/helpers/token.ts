import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repository/user.repository';

export function generateRefreshToken(id: number) {
    return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET,
        { expiresIn: process.env.REFRESH_JWT_EXPIRE_IN }
    );
}

export function generateAccesToken(id: number) {
    return jwt.sign(
        { id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
    );
}

export function generateAccesTokenEmail(email: string) {
    return jwt.sign(
        { email }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
    );
}

export function verifyToken(res: Response, token: string) {
    return jwt.verify(token, async (err, decodedToken) => {
        if(err) return res.send(401)

        const user = await userRepository.findById(decodedToken.id)
        if(!user) {
            res.status(403).send("Cet utilisateur n'existe plus !!")
        }

        delete decodedToken.iat
        delete decodedToken.exp;

        res.send({
            accessToken: generateAccesToken(decodedToken.id),
        });
    })
}