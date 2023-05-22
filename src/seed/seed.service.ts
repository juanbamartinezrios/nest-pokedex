import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: AxiosAdapter
  ) { }

  async executeSeed() {
    // Se hace el deleteMany para limpiar la base y evitar duplicados cada vez que se ejecute el seed
    await this.pokemonModel.deleteMany({});
    const data: PokeResponse = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsertInSeed: { name: string, nro: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length - 2];
      // const pokemon = await this.pokemonModel.create({ name, nro });
      pokemonToInsertInSeed.push({ name, nro });
    });
    // se realizan las inserciones todas juntas mediante la acumulación de Promises
    // no hace falta el async en data.results.forEach(async ({ name, url }) => {
    await this.pokemonModel.insertMany(pokemonToInsertInSeed);
    // insert into pokemons (name, nro)
    return 'Seed executed';
  }
}
