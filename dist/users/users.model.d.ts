import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    email: string;
    password: string;
    nickname: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: string;
    email: string;
    password: string;
    nickname: string;
}
export {};
