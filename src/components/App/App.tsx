import { FC } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Pagenation } from '../Pagenation/Pagenation';
import { PokeCards } from '../PokeCards/PokeCards';
import { useApp } from './App.use';
import './App.css';

export const App: FC = () => {
  const { isLoading, pokeDataDetails, pokeListUri, pokemonGet } = useApp();
  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navbar />
          <PokeCards pokeDataDetails={pokeDataDetails} />
          <Pagenation pokeListUri={pokeListUri} pokemonGet={pokemonGet} />
          <div>
            <select onChange={(e)=>{}}>
              <option value={18}>18</option>
              <option value={36}>36</option>
              <option value={54}>54</option>
              <option value={72}>72</option>
              <option value={90}>90</option>
              <option value={108}>108</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
