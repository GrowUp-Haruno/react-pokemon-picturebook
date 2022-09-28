import { Center, Heading, HStack, Image, SimpleGrid, Spinner, Tag, Text } from "@chakra-ui/react";
import { FC } from "react";
import { PokeData } from "../App/App.model";

import { Card } from "../Card/Card";
import { PokeModal } from "../PokeModal/PokeModal";
import { pokecardsProps, typeColors } from "./PokeCards.style";
import { usePokeCards } from "./PokeCards.use";

export const PokeCards: FC<{
  pokeDatas: Array<PromiseSettledResult<PokeData>>;
  isLoading: boolean;
}> = ({ pokeDatas, isLoading }) => {
  const { modalPokeData, isOpen, handleModalOpen, handleModalClose } = usePokeCards();

  if (isLoading)
    return (
      <Center>
        <Spinner size={["md", "lg", "xl"]} />
      </Center>
    );

  return (
    <>
      <SimpleGrid {...pokecardsProps}>
        {pokeDatas.map((pokeData) => {
          if (pokeData.status === "rejected") return <></>;
          return (
            <Card
              key={pokeData.value.name}
              onClick={() => {
                handleModalOpen(pokeData.value);
              }}
            >
              {/* 全国図鑑番号 */}
              <Text alignItems="start">No.{pokeData.value.id}</Text>
              {/* 画像 */}
              <Image src={pokeData.value.sprites.front_default} alt={pokeData.value.name} h="96px"/>
              {/* 名前 */}
              <Heading as="h2" size="lg">
                {pokeData.value.name}
              </Heading>
              {/* 属性 */}
              <HStack spacing={4}>
                {pokeData.value.types.map((type) => (
                  <Tag
                    key={type.type.name}
                    size={["sm", "md"]}
                    bgColor={typeColors[type.type.name].bgColor}
                    color={typeColors[type.type.name].color}
                  >
                    {type.type.name}
                  </Tag>
                ))}
              </HStack>
            </Card>
          );
        })}
      </SimpleGrid>
      <PokeModal isOpen={isOpen} modalPokeData={modalPokeData} handleModalClose={handleModalClose} />
    </>
  );
};
