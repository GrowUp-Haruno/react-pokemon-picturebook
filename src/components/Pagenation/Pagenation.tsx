import { FC, MouseEventHandler, useState } from 'react';
import { initLimit, initPosition } from '../../setting';
import './pagenation.css';

export const Pagenation: FC<{
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
  pokeCount: number;
  isLoading: boolean;
}> = ({ pokemonGet, pokeCount, isLoading }) => {
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

  return (
    <div className="pagenation">
      {uriSetting.position !== 0 ? (
        <button onClick={handlePrevPage}>Back</button>
      ) : (
        <></>
      )}
      {uriSetting.position + uriSetting.limit <= pokeCount ? (
        <button onClick={handleNextPage}>Next</button>
      ) : (
        <></>
      )}
    </div>
  );
};
