import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// indica que es un esquema de DB
@Schema()
export class Pokemon extends Document {
    // extiende de Document para poder ser tomado como un DOCUMENTO de mongoose
    // id: string; no hace falta especificarlo porque lo da la DB
    @Prop({
        unique: true,
        index: true
    })
    name: string;
    @Prop({
        unique: true,
        index: true
    })
    nro: number;
}

// exportar el esquema para decirle a la DB las reglas, condiciones que tiene este esquema (en base a una clase)
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
