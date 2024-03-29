import { CustomBaseEntity } from "./CustomBaseEntity";
import { User } from "./UserEntity";

export class LoginSession extends CustomBaseEntity {
    user!: User;
    secret?: string;
    active?: boolean;
    lastActive?: Date;
}