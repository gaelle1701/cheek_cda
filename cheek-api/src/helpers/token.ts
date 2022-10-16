import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { userRepository } from '../repository/user.repository';


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
