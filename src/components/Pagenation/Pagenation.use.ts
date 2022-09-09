import { MouseEventHandler, useState } from 'react';
import { initLimit, initPosition } from '../../setting';

type usePagenationTypes = (
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>,
  pokeCount: number
) => {
  uriSetting: {
    limit: number;
    position: number;
  };
  handlePrevPage: MouseEventHandler<HTMLButtonElement>;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
};

export const usePagenation: usePagenationTypes = (pokemonGet, pokeCount) => {
  const [uriSetting, setUriSetting] = useState<{
    limit: number;
    position: number;
  }>({
    limit: initLimit,
    position: initPosition,
  });

  const handlePrevPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (uriSetting.position !== 0) {
      setUriSetting(({ limit, position }) => {
        const newPosition = position - limit < 0 ? 0 : position - limit;
        pokemonGet(
          `https://pokeapi.co/api/v2/pokemon/?offset=${newPosition}&limit=${limit}`
        ).catch((error) => {
          console.log(error);
        });
        return {
          limit,
          position: position - limit < 0 ? 0 : position - limit,
        };
      });
    }
  };

  const handleNextPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (uriSetting.position + uriSetting.limit <= pokeCount) {
      setUriSetting(({ limit, position }) => {
        const newPosition = position + limit;
        pokemonGet(
          `https://pokeapi.co/api/v2/pokemon/?offset=${newPosition}&limit=${limit}`
        ).catch((error) => {
          console.log(error);
        });
        return {
          limit,
          position: newPosition,
        };
      });
    }
  };
  return { uriSetting,handlePrevPage, handleNextPage };
};
