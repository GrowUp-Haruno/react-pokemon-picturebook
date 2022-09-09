import { FC, MouseEventHandler } from 'react';
import { PokeListUriType } from '../App/App.model';
import './pagenation.css';

export const Pagenation: FC<{
  pokeListUri: PokeListUriType;
  pokemonGet: (pokemonListURI: string) => Promise<void>;
}> = ({ pokeListUri, pokemonGet }) => {
  const handleNextPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (pokeListUri.next !== null)
      pokemonGet(pokeListUri.next).catch((error) => console.log(error));
  };
  const handlePrevPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (pokeListUri.prev !== null)
      pokemonGet(pokeListUri.prev).catch((error) => console.log(error));
  };
  return (
    <div className="pagenation">
      {' '}
      {pokeListUri.prev !== null ? (
        <button onClick={handlePrevPage}>Back</button>
      ) : (
        <></>
      )}
      {pokeListUri.next !== null ? (
        <button onClick={handleNextPage}>Next</button>
      ) : (
        <></>
      )}
    </div>
  );
};
