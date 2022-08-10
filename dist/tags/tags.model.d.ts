import { Model } from "sequelize-typescript";
import { User } from "src/users/users.model";
export interface ITagCreationAttrs {
    readonly name: string;
    readonly creator: string;
    readonly sortOrder: number;
}
export declare class Tag extends Model<Tag, ITagCreationAttrs> {
    id: number;
    creator: string;
    name: string;
    sortOrder: number;
    users: User[];
}
