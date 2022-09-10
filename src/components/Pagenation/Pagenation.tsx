import { FC } from 'react';
import { initPagenationquantity } from '../../setting';
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
          <>
            {[
              ...Array(
                Math.floor(pokeCount / uriSetting.limit) >=
                  initPagenationquantity
                  ? initPagenationquantity
                  : Math.floor(pokeCount / uriSetting.limit)
              ),
            ].map((_, index) => (
              <button key={index}>{index + 1}</button>
            ))}
          </>

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
