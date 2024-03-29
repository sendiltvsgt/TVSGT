import { CustomBaseEntity } from "./CustomBaseEntity";
import { Manufacturer } from "./ManufacturerEntity";
import { TaxRate } from "./TaxRateEntity";
import { VehicleModel } from "./VehicleModelEntity";

export class ProductSku extends CustomBaseEntity {

    name!: string;
    code!: string;
    shortDescription!: string;
    longDescription!: string;
    specifications!: [];
    hsnCode!: string;
    price!: number;
    active!: boolean;
    deactivatedOn?: Date;
    manufacturer!: Manufacturer;
    vehicleModels!: VehicleModel[];
    taxRate?: TaxRate;
    uom?: string;
    boxContents?: string;
    primaryImage?: string;
    slug!: string;
    coupancode!:string;

}  