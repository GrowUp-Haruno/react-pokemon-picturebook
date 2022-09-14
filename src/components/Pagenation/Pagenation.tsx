import { FC } from "react";
import { initLimit, initLimitquantity } from "../../setting";
import "./pagenation.css";
import { usePagenation } from "./Pagenation.use";

export const Pagenation: FC<{
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>;
  pokeCount: number;
  isLoading: boolean;
}> = ({ pokemonGet, pokeCount, isLoading }) => {
  const {
    pagenationSetting: { pagePosition, pageTotal, uriLimit },
    handleNextPage,
    handlePrevPage,
    handleChangeSelect,
    createPagenation,
  } = usePagenation(pokemonGet, pokeCount);
  return (
    <div className="pagenation-container">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="pagenation">
            {pagePosition <= 1 ? <></> : <button onClick={handlePrevPage}>Back</button>}
            {createPagenation().map(({ jumpNumber, style, handleJumpPage }) => (
              <button key={jumpNumber} style={style} onClick={handleJumpPage}>
                {jumpNumber}
              </button>
            ))}
            {pagePosition >= pageTotal ? <></> : <button onClick={handleNextPage}>Next</button>}
          </div>
          <div className="">
            <select onChange={handleChangeSelect} defaultValue={uriLimit}>
              {[...Array(initLimitquantity)].map((_, i) => {
                const value = initLimit * (i + 1);
                return (
                  <option value={value} key={i}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
    </div>
  );
};
