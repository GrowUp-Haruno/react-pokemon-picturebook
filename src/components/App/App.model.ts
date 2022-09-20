export type PokeDataDetailType = {
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
  species: { url: string };
};

export type PokeDataSpeciesType = {
  id: number;
  names: Array<{ language: { name: string }; name: string }>;
};

export type PokeDataType = PokeDataDetailType & PokeDataSpeciesType;
