import { CustomBaseEntity } from "./CustomBaseEntity";
import { ServiceableState } from "./ServiceableStateEntity";
import { Stockist } from "./StockistEntity";

export class StockistAddress extends CustomBaseEntity {

    addressTitle!: string;
    address!: string;
    city!: string;
    state!: ServiceableState;
    zip!: string;
    gstNumber?: string;
    phone!: string;
    isPrimary!: boolean;
    stockist!: Stockist;

}