import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PokeDataDetailType, PokeListUriType } from './App.model';

const _apiOffset = 0;
const _apiLimit = 18;
const initPokeListURI = `https://pokeapi.co/api/v2/pokemon/?offset=${_apiOffset}&limit=${_apiLimit}`;

type useAppTypes = () => {
  isLoading: boolean;
  pokeListUri: PokeListUriType;
  pokeDataDetails: Array<PromiseSettledResult<PokeDataDetailType>>;
  pokemonGet: (pokemonListURI: string) => Promise<void>;
};

export const useApp: useAppTypes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeListUri, setpokeListUri] = useState<PokeListUriType>({
    next: initPokeListURI,
    prev: null,
  });
  
  const [pokeDataDetails, setPokeDataDetails] = useState<
    Array<PromiseSettledResult<PokeDataDetailType>>
  >([]);

  const pokemonGet: (pokemonListURI: string) => Promise<void> = async (
    pokemonListURI
  ) => {
    try {
      setIsLoading(true);

      /** ポケモン一覧を取得 */
      const pokeList: AxiosResponse<{
        results?: Array<{ url: string }>;
        next: string | null;
        previous: string | null;
        count: number;
      }> = await axios.get(pokemonListURI);
      setpokeListUri({
        next: pokeList.data.next,
        prev: pokeList.data.previous,
      });

      console.log(pokeList);

      if (typeof pokeList.data.results === 'undefined')
        throw new Error('データに異常が見つかりました(No.1)');

      setPokeDataDetails(
        await Promise.allSettled(
          pokeList.data.results.map(async (poke) => await axios.get(poke.url))
        )
      );

      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
      console.log('通信エラー');
    }
  };
  useEffect(() => {
    pokemonGet(initPokeListURI).catch((error) => {
      console.log(error);
    });
  }, []);
  return { isLoading, pokeListUri, pokeDataDetails, pokemonGet };
};
