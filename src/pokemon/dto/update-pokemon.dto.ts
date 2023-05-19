import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
import { IsString, IsInt, IsPositive, MinLength, Min, IsOptional } from "class-validator";

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name: string;
    @IsInt()
    @IsPositive()
    @Min(1)
    @IsOptional()
    readonly nro: number;
}
