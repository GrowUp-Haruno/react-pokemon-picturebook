export type PokeDetail = {
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string; url: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
  species: { url: string };
};

export type PokeSpecies = {
  id: number;
  genera: string;
  names: Array<{ language: { name: string }; name: string }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string; url: string };
  }>;
};
export type PokeType = {
  names: Array<{ language: { name: string }; name: string }>;
};

export type PokeData = PokeDetail & {
  id: number;
  flavorText: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
};
