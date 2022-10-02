import { EAccountStatus } from "../enums/account-status";
import { ERole } from "../enums/role";
import { IAddress } from "./address";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    token: string;

    role: ERole;
    accountStatus: EAccountStatus;
    
    address: IAddress;
}
export type IUsers = IUser[]