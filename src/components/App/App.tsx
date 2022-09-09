import { FC } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Pagenation } from '../Pagenation/Pagenation';
import { PokeCards } from '../PokeCards/PokeCards';
import { useApp } from './App.use';
import './App.css';

export const App: FC = () => {
  const {
    isLoading,
    pokeDataDetails,
    pokeCount,
    pokemonGet,
  } = useApp();
  return (
    <div className="App">
      <Navbar />
      <PokeCards pokeDataDetails={pokeDataDetails} isLoading={isLoading} />
      <Pagenation
        pokemonGet={pokemonGet}
        isLoading={isLoading}
        pokeCount={pokeCount}
      />
      {/* <div>
        <select onChange={(e) => {}}>
          <option value={18}>18</option>
          <option value={36}>36</option>
          <option value={54}>54</option>
          <option value={72}>72</option>
          <option value={90}>90</option>
          <option value={108}>108</option>
        </select>
      </div> */}
    </div>
  );
};

export default App;
