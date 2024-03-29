import { CustomBaseEntity } from "./CustomBaseEntity";

export class Stockist extends CustomBaseEntity {
    name!: string;
    email!: string;
    phone!: string;
    secondaryPhone?: string;
}