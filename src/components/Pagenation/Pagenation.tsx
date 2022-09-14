import { FC } from "react";
import "./pagenation.css";
import { usePagenation } from "./Pagenation.use";

export const Pagenation: FC<{
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
  pokeCount: number;
  isLoading: boolean;
}> = ({ pokemonGet, pokeCount, isLoading }) => {
  const {
    pagenationSetting: { pagePosition, pageTotal },
    handleNextPage,
    handlePrevPage,
    createPagenation,
  } = usePagenation(pokemonGet, pokeCount);
  return (
    <div className="pagenation">
      {isLoading ? (
        <></>
      ) : (
        <>
          {pagePosition <= 1 ? <></> : <button onClick={handlePrevPage}>Back</button>}

          {createPagenation().map(({ jumpNumber, style, handleJumpPage }) => (
            <button key={jumpNumber} style={style} onClick={handleJumpPage}>
              {jumpNumber}
            </button>
          ))}

          {pagePosition >= pageTotal ? <></> : <button onClick={handleNextPage}>Next</button>}
        </>
      )}
    </div>
  );
};
