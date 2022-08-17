import { ApiProperty } from "@nestjs/swagger";
import { IsString, NotEquals, ValidateIf } from "class-validator";

export class UpdateTagDto {
    @ApiProperty({example: 'example', description: 'название тэга'})
    @IsString({message: 'название тэга должно быть строкой'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    readonly name?: string;

    @ApiProperty({example: 'example', description: 'порядковый номер для сортировки'})
    @IsString({message: 'порядковый номер для сортировки должен быть числом'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    readonly sortOrder?: number;
}