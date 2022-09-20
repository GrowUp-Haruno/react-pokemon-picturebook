import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Pagenation } from "../Pagenation/Pagenation";
import { PokeCards } from "../PokeCards/PokeCards";
import { useApp } from "./App.use";

export const App: FC = () => {
  const { isLoading, pokeDatas, pokeCount, pokemonGet } = useApp();
  return (
    <VStack w={"full"} h={"100vh"}>
      <Navbar />
      <PokeCards pokeDatas={pokeDatas} isLoading={isLoading} />
      <Pagenation pokemonGet={pokemonGet} isLoading={isLoading} pokeCount={pokeCount} />
    </VStack>
  );
};

export default App;
