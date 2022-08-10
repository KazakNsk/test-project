import { Model } from "sequelize-typescript";
import { Tag } from "src/tags/tags.model";
export interface IUserCreationAttrs {
    readonly email: string;
    readonly password: string;
    readonly nickname: string;
}
export declare class User extends Model<User, IUserCreationAttrs> {
    id: string;
    email: string;
    password: string;
    nickname: string;
    tags: Tag[];
}
