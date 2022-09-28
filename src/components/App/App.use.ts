import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { initPokeAbilityURI, initPokeListURI, initPokeTypesURI, initPokeVersionURI } from "../../setting";
import { PokeDetail, PokeSpecies, PokeData } from "./App.model";

type useAppTypes = () => {
  isLoading: boolean;
  pokeDatas: Array<PromiseSettledResult<PokeData>>;
  pokeCount: number;
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
};

export const useApp: useAppTypes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeDatas, setPokeDatas] = useState<Array<PromiseSettledResult<PokeData>>>([]);
  const [pokeCount, setPokeCount] = useState(0);
  const [pokeTypes, setPokeTypes] = useState<{ [name in string]: string }>({});
  const [pokeAbilities, setPokeAbilities] = useState<{ [name in string]: string }>({});
  const [pokeVersions, setPokeVersions] = useState<{ [name in string]: string }>({});

  const api = axios.create();

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
        pokeList.data.results.map<Promise<PokeData>>(async (poke) => {
          const { abilities, height, species, sprites, types, weight } = (await api.get<PokeDetail>(poke.url)).data;
          const pokeSpecies = (await api.get<PokeSpecies>(species.url)).data;
          const findJaHrkt: (name: {
            language: {
              name: string;
            };
          }) => boolean = (name) => name.language.name === "ja-Hrkt";
          const jpName = pokeSpecies.names[pokeSpecies.names.findIndex(findJaHrkt)].name;
          const jpTypes = types.map((item) => {
            item.type.name = pokeTypes[item.type.name];
            return item;
          });
          const jpAbilities = abilities.map((item) => {
            item.ability.name = pokeAbilities[item.ability.name];
            return item;
          });
          const findeJpFlavorText = pokeSpecies.flavor_text_entries.filter(findJaHrkt);
          // バージョンの並び順を整える
          findeJpFlavorText.sort((a, b) => {
            const va = parseInt(a.version.url.substring(34, a.version.url.length - 1), 10);
            const vb = parseInt(b.version.url.substring(34, b.version.url.length - 1), 10);
            return va - vb;
          });
          const jpFlavorText = findeJpFlavorText.map((item) => {
            item.version.name = pokeVersions[item.version.name];
            return item;
          });
          return {
            abilities: jpAbilities,
            height,
            name: jpName,
            species,
            sprites,
            types: jpTypes,
            weight,
            id: pokeSpecies.id,
            names: pokeSpecies.names,
            flavorText: jpFlavorText,
          };
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

  // 属性データの非同期取得関数
  const getPokeTypes: () => Promise<void> = async () => {
    const result = await api.get<{ results: Array<{ url: string }> }>(initPokeTypesURI);
    const resultPokeTyes = await Promise.allSettled(
      result.data.results.map(
        async (result) => await api.get<{ name: string; names: Array<{ name: string }> }>(result.url)
      )
    );
    resultPokeTyes.forEach((result) => {
      if (result.status === "fulfilled") {
        setPokeTypes((prev) => {
          prev[result.value.data.name] = result.value.data.names[0].name;
          return prev;
        });
      }
    });
  };

  // 特性データの非同期取得関数
  const getPokeAbilities: () => Promise<void> = async () => {
    const result = await api.get<{ results: Array<{ url: string }> }>(initPokeAbilityURI);
    const resultPokeAbilities = await Promise.allSettled(
      result.data.results.map(
        async (result) => await api.get<{ name: string; names: Array<{ name: string }> }>(result.url)
      )
    );
    resultPokeAbilities.forEach((result) => {
      if (result.status === "fulfilled") {
        setPokeAbilities((prev) => {
          prev[result.value.data.name] = result.value.data.names[0].name;
          return prev;
        });
      }
    });
  };

  // バージョンデータの非同期取得関数
  const getPokeVersions: () => Promise<void> = async () => {
    const result = await api.get<{ results: Array<{ url: string }> }>(initPokeVersionURI);
    const resultPokeVersions = await Promise.allSettled(
      result.data.results.map(
        async (result) => await api.get<{ name: string; names: Array<{ name: string }> }>(result.url)
      )
    );
    resultPokeVersions.forEach((result) => {
      if (result.status === "fulfilled") {
        setPokeVersions((prev) => {
          prev[result.value.data.name] = result.value.data.names[0].name;
          return prev;
        });
      }
    });
  };

  useEffect(() => {
    Promise.allSettled([getPokeTypes(), getPokeAbilities(), getPokeVersions()])
      .then(async () => {
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
