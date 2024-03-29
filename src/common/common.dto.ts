import { LoginSession } from '../entities/LoginSessionEntity';
import { OrderShipment } from '../entities/OrderShipmentEntity';
import { User } from '../entities/UserEntity';

export class ApiResponseDataDto<T> {
    data!: T;
    count?: number | 0;
}

export class JSObjectDto {
    [key: string]: string | null;
}

export class ApiPostResponseDataDto<T> {
    data!: T;
    success?: boolean;
}

export class ShipmentOrderWithFileDto extends OrderShipment {
    file!: string;
}

export class ShipmentOrderAddDto {
    shipment!: OrderShipment;
    file!: string;
}

export class LoginStatusDto {
    user!: User;
    privilege!: string[];
    loginSession!: LoginSession;
}

export class LoginStatusResponseDto {
    success!: boolean;
    data!: LoginStatusDto;
}

export class LoginResponseDto {
    success!: boolean;
    data!: LoginResponseDataDto;
}

export class LoginResponseDataDto {
    token!: string;
    privileges!: string[];
    user!: User;
}

export class AdminResetPasswordDto {
    newPassword!: string;
    confirmPassword!: string;
}
