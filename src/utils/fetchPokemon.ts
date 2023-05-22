import axios from "axios";

import { IPokemon } from "../models";

const getPokemon = async (id: number): Promise<IPokemon> => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: IPokemon = {
    id: data.id,
    image: data.sprites.front_default,
  };
  return pokemon;
};

async function fetchRandomPokemon(amount: number): Promise<IPokemon[]> {
  const pokemonIds: Set<number> = new Set();
  while (pokemonIds.size < amount) {
    const randomId = Math.floor(Math.random() * 810) + 1;
    pokemonIds.add(randomId);
  }

  const fetchPromises = Array.from(pokemonIds).map((id) => getPokemon(id));
  const fetchedPokemon = await Promise.all(fetchPromises);

  return fetchedPokemon;
}

export default fetchRandomPokemon;
