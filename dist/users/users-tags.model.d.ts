import { Model } from "sequelize-typescript";
export declare class UserTag extends Model<UserTag> {
    id: number;
    userId: string;
    tagId: number;
}
