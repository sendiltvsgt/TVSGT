import { CustomBaseEntity } from "./CustomBaseEntity";
import { Manufacturer } from "./ManufacturerEntity";
import { ServiceableState } from "./ServiceableStateEntity";

export class ManufacturerAddress extends CustomBaseEntity {
    addressTitle!: string;
    address!: string;
    city!: string;
    state!: ServiceableState;
    zip!: string;
    email!: string;
    phone!: string;
    gstNumber!: string;
    manufacturer!: Manufacturer;
    
}