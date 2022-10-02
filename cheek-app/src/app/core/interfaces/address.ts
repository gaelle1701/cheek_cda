export interface IAddress {
    id: number;
    number: number;
    street: string;
    city: string;
    zip_code: number;
}
export type IAddresses = IAddress[];