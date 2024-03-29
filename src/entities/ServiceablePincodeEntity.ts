import { CustomBaseEntity } from "./CustomBaseEntity";
import { ServiceableState } from "./ServiceableStateEntity";

export class ServiceablePincode extends CustomBaseEntity {
    pincode!: string;
    cityOrTown!: string;
    state!: ServiceableState ;
}