import { FC } from 'react';
// import { initPagenationquantity } from '../../setting';
import './pagenation.css';
import { usePagenation } from './Pagenation.use';

export const Pagenation: FC<{
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
  pokeCount: number;
  isLoading: boolean;
}> = ({ pokemonGet, pokeCount, isLoading }) => {
  const {
    uriSetting,
    pagenationSetting,
    handleNextPage,
    handlePrevPage,
    handleJumpPage,
    createPagenation,
  } = usePagenation(pokemonGet, pokeCount);

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
            {createPagenation().map((number) => (
              <button
                key={number}
                style={{
                  backgroundColor:
                    number === pagenationSetting.pagePosition ? 'red' : 'white',
                  border: '1px solid gray',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleJumpPage(number);
                }}
              >
                {number}
              </button>
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
