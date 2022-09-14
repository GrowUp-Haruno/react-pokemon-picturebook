import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Pagenation } from "../Pagenation/Pagenation";
import { PokeCards } from "../PokeCards/PokeCards";
import { useApp } from "./App.use";
// import './App.css';

export const App: FC = () => {
  const { isLoading, pokeDataDetails, pokeCount, pokemonGet } = useApp();
  return (
    <VStack w={"full"} h={"100vh"}>
      <Navbar />
      <PokeCards pokeDataDetails={pokeDataDetails} isLoading={isLoading} />
      <Pagenation pokemonGet={pokemonGet} isLoading={isLoading} pokeCount={pokeCount} />
    </VStack>
    // <div className="App">
    // </div>
  );
};

export default App;
