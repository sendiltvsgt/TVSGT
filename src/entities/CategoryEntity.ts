import { CustomBaseEntity } from "./CustomBaseEntity";

export class Category extends CustomBaseEntity {
  name!: string;
  sort!: number;
  shortDescription!: string;
  longDescription?: string;
  parentCategory?: Category;
}