import { ApiProperty } from "@nestjs/swagger";
import { IsString, NotEquals, ValidateIf } from "class-validator";

export class CreateTagDto {
    @ApiProperty({example: 'example', description: 'название тэга'})
    @IsString({message: 'название тэга должно быть строкой'})
    readonly name: string;

    @ApiProperty({example: 'example', description: 'порядковый номер для сортировки'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    readonly sortOrder?: number;
}