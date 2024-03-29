export abstract class CustomBaseEntity {
    id!: number;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
}