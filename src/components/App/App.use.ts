import axios, { AxiosError, AxiosResponse } from "axios";
import { setupCache } from "axios-cache-adapter";
import { useEffect, useState } from "react";
import { initPokeAbilityURI, initPokeListURI, initPokeTypesURI } from "../../setting";
import { PokeDataDetailType, PokeDataSpeciesType, PokeDataType } from "./App.model";

type useAppTypes = () => {
  isLoading: boolean;
  pokeDatas: Array<PromiseSettledResult<PokeDataType>>;
  pokeCount: number;
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
};

export const useApp: useAppTypes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeDatas, setPokeDatas] = useState<Array<PromiseSettledResult<PokeDataType>>>([]);
  const [pokeCount, setPokeCount] = useState(0);
  const [pokeTypes, setpokeTypes] = useState<{ [name in string]: string }>({});

  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
  });
  const api = axios.create({
    adapter: cache.adapter,
  });

  const pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null> = async (pokemonListURI) => {
    try {
      setIsLoading(true);
      /** ポケモン一覧を取得 */
      const pokeList: AxiosResponse<{
        results: Array<{ url: string }> | undefined;
        count: number | undefined | null;
      }> = await api.get(pokemonListURI);

      if (typeof pokeList.data.results === "undefined") throw new Error("データに異常が見つかりました(No.1)");

      const resultPokeData = await Promise.allSettled(
        pokeList.data.results.map<Promise<PokeDataType>>(async (poke) => {
          const { abilities, height, species, sprites, types, weight } = (await api.get<PokeDataDetailType>(poke.url))
            .data;
          const { id, names } = (await api.get<PokeDataSpeciesType>(species.url)).data;
          const name: string = names[0].name;
          const jpTypes = types.map((item) => {
            item.type.name = pokeTypes[item.type.name];
            return item;
          });
          return { abilities, height, name, species, sprites, types: jpTypes, weight, id, names };
        })
      );
      setPokeDatas(resultPokeData);

      setIsLoading(false);

      return pokeList.data.count;
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.message);
      console.log("通信エラー");
    }
  };

  useEffect(() => {
    api
      .get<{ results: Array<{ url: string }> }>(initPokeTypesURI)
      .then(async (result) => {
        const resultPokeTyes = await Promise.allSettled(
          result.data.results.map(
            async (result) => await api.get<{ name: string; names: Array<{ name: string }> }>(result.url)
          )
        );
        resultPokeTyes.forEach((result) => {
          if (result.status === "fulfilled") {
            setpokeTypes((prev) => {
              prev[result.value.data.name] = result.value.data.names[0].name;
              return prev;
            });
          }
        });
        return await api.get(initPokeAbilityURI);
      })
      .then(async (result) => {
        return await pokemonGet(initPokeListURI);
      })
      .then((count) => {
        setPokeCount(count ?? 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    isLoading,
    pokeDatas,
    pokeCount,
    pokemonGet,
  };
};
