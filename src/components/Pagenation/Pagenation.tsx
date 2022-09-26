import { Button, FormControl, FormLabel, HStack, Select, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { initLimit, initLimitquantity } from "../../setting";
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
  if (isLoading) return <></>;
  return (
    <VStack py={8} spacing={4} w="sm">
      <HStack>
        {pagePosition <= 1 ? <></> : <Button onClick={handlePrevPage}>Back</Button>}
        {createPagenation().map(({ jumpNumber, props }) => (
          <Button key={jumpNumber} {...props}>
            {jumpNumber}
          </Button>
        ))}
        {pagePosition >= pageTotal ? <></> : <Button onClick={handleNextPage}>Next</Button>}
      </HStack>
      <FormControl>
        <FormLabel>表示件数</FormLabel>
        <Select onChange={handleChangeSelect} defaultValue={uriLimit}>
          {[...Array(initLimitquantity)].map((_, i) => {
            const value = initLimit * (i + 1);
            return (
              <option value={value} key={i}>
                {value}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </VStack>
  );
};
