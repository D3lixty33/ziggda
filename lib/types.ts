import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type User = {
    id : string;
    name: string;
    email: string;
    address : string;
    phoneNumber : number;
}

export type Transaction = {
    id : string;
    created_at? : Timestamp,
    user_id : string,
    invoice_recipient? : string,
    addressee? : string,
    beneficiary? : string,
    payee? : string,
    amount? : number
}

export type CreditCardProp = {
    id : string;
    user : string;
    cvv : number;
    main_cd : number;
    exp_date : Date;
}