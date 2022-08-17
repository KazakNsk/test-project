import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class AddTagDto {
    @ApiProperty({example: '[1, 2]', description: 'массив тэгов к текущему пользователю'})
    @IsArray({message: "введите массив id тэгов"})
    readonly tags: Array<number>;
}