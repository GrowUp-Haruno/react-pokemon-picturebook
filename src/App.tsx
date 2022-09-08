import { FC, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import './App.css';
import { Card } from './components/Card/Card';
import { Navbar } from './components/Navbar/Navbar';

const apiOffset = 0;
const apiLimit = 18;
// const addOffset = 18;
const pokeListURI = `https://pokeapi.co/api/v2/pokemon/?offset=${apiOffset}&limit=${apiLimit}`;

export type pokeDataDetailType = AxiosResponse<{
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
}>;

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokeDataDetails, setPokeDataDetails] = useState<
    Array<PromiseSettledResult<pokeDataDetailType>>
  >([]);

  useEffect(() => {
    (async () => {
      try {
        /** ポケモン一覧を取得 */
        const pokeList: AxiosResponse<{
          results?: Array<{ url: string }>;
        }> = await axios.get(pokeListURI);

        if (typeof pokeList.data.results === 'undefined')
          throw new Error('データに異常が見つかりました(No.1)');

        setPokeDataDetails(
          await Promise.allSettled(
            pokeList.data.results.map(async (poke) => await axios.get(poke.url))
          )
        );

        setIsLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) console.log(error.message);
        console.log('通信エラー');
      }
    })();
  }, []);

  console.log(pokeDataDetails[1]);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Navbar />
          <div className="pokemonCardContainer">
            {pokeDataDetails.map((pokeDataDetail) =>
              pokeDataDetail.status === 'fulfilled' ? (
                <Card
                  key={pokeDataDetail.value.data.name}
                  pokeDataDetail={pokeDataDetail}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
