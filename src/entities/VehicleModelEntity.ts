import { CustomBaseEntity } from "./CustomBaseEntity";
import { VehicleBrand } from "./VehicleBrandEntity";

export class VehicleModel extends CustomBaseEntity {

    name!: string;
    sort!: number;
    vehicleBrand!: VehicleBrand;
    
}