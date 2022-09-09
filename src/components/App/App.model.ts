import { AxiosResponse } from "axios";

export type PokeDataDetailType = AxiosResponse<{
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
}>;

