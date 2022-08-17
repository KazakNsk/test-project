import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, NotEquals, ValidateIf } from "class-validator";

export class QueryParams {
    @ApiProperty({example: '2', description: 'страница пагинации'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsNumber()
    @Type(() => Number)
    readonly page: number;

    @ApiProperty({example: '10', description: 'количество тэгов на странице (offset)'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsNumber()
    @Type(() => Number)
    readonly pageSize: number

    @ApiProperty({example: 'true', description: 'сортировка по номеру'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsBoolean()
    @Type(() => Boolean)
    readonly sortByOrder: boolean; 
    
    @ApiProperty({example: 'tag?sortByName=false', description: 'сортировка по имени'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsBoolean()
    @Type(() => Boolean)
    readonly sortByName: boolean;
    
}