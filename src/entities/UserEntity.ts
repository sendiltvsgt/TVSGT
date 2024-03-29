import { UserType } from "../common/common.enum";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { Manufacturer } from "./ManufacturerEntity";
import { Stockist } from "./StockistEntity";

export class User extends CustomBaseEntity {
    firstName!: string;
    lastName?: string;
    username!: string;
    password!: string;
    email!: string;
    phone!: string;
    userType!: UserType;
    active!: boolean;
    stockist?: Stockist;
    manufacturer?: Manufacturer;
}