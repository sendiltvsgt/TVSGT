import { CustomBaseEntity } from "./CustomBaseEntity";

export class Manufacturer extends CustomBaseEntity {
    name!: string;
    hoAddress!: string;
    hoCity!: string;
    hoState!: string;
    hoZip!: string;
    email!: string;
    phone!: string;
    secondaryPhone?: string;
    code!:string;
}