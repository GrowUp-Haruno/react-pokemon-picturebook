import { FC } from 'react';
import './pagenation.css';
import { usePagenation } from './Pagenation.use';

export const Pagenation: FC<{
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
  pokeCount: number;
  isLoading: boolean;
}> = ({ pokemonGet, pokeCount, isLoading }) => {
  const { uriSetting, handleNextPage, handlePrevPage } = usePagenation(
    pokemonGet,
    pokeCount
  );

  return (
    <div className="pagenation">
      {isLoading ? (
        <></>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
