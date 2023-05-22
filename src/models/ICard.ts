import { IPokemon } from "../models";

export interface ICard {
  pokemon: IPokemon;
  flipped: boolean;
  canFlip: boolean;
}
