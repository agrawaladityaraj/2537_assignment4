import IPokemon from "./IPokemon";

export default interface ICard {
  pokemon: IPokemon;
  flipped: boolean;
  canFlip: boolean;
}
