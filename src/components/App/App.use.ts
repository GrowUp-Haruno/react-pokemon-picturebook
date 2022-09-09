import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { initPokeListURI } from '../../setting';
import { PokeDataDetailType } from './App.model';

type useAppTypes = () => {
  isLoading: boolean;
  pokeDataDetails: Array<PromiseSettledResult<PokeDataDetailType>>;
  pokeCount: number;
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
};

export const useApp: useAppTypes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [pokeDataDetails, setPokeDataDetails] = useState<
    Array<PromiseSettledResult<PokeDataDetailType>>
  >([]);

  const [pokeCount, setPokeCount] = useState(0);
  const pokemonGet: (
    pokemonListURI: string
  ) => Promise<number | undefined | null> = async (pokemonListURI) => {
    try {
      setIsLoading(true);

      /** ポケモン一覧を取得 */
      const pokeList: AxiosResponse<{
        results: Array<{ url: string }> | undefined;
        count: number | undefined | null;
      }> = await axios.get(pokemonListURI);

      console.log(pokeList);

      if (typeof pokeList.data.results === 'undefined')
        throw new Error('データに異常が見つかりました(No.1)');

      setPokeDataDetails(
        await Promise.allSettled(
          pokeList.data.results.map(async (poke) => await axios.get(poke.url))
        )
      );

      setIsLoading(false);

      return pokeList.data.count;
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
      console.log('通信エラー');
    }
  };
  useEffect(() => {
    pokemonGet(initPokeListURI)
      .then((count) => {
        setPokeCount(count ?? 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    isLoading,
    pokeDataDetails,
    pokeCount,
    pokemonGet,
  };
};
