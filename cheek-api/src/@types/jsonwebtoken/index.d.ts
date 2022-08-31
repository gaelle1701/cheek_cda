import { jwt } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface UserId extends jwt.JwtPayload {
    id: number;
  }
}
