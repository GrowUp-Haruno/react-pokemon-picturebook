import {
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { PokeData } from "../App/App.model";

import { Card } from "../Card/Card";
import { pokecardsProps, typeColors } from "./PokeCards.style";

export const PokeCards: FC<{
  pokeDatas: Array<PromiseSettledResult<PokeData>>;
  isLoading: boolean;
}> = ({ pokeDatas, isLoading }) => {
  if (isLoading)
    return (
      <Center>
        <Spinner size={["md", "lg", "xl"]} />
      </Center>
    );

  return (
    <SimpleGrid {...pokecardsProps}>
      {pokeDatas.map((pokeData) =>
        pokeData.status === "fulfilled" ? (
          <Card key={pokeData.value.name}>
            {/* 全国図鑑番号 */}
            <Text alignItems="start">No.{pokeData.value.id}</Text>
            {/* 画像 */}
            <Image src={pokeData.value.sprites.front_default} alt={pokeData.value.name} />
            {/* 名前 */}
            <Heading as="h2" size="lg">
              {pokeData.value.name}
            </Heading>
            {/* 属性 */}
            <HStack spacing={4}>
              {pokeData.value.types.map((type, i) => (
                <Tag
                  key={type.type.name}
                  size="md"
                  bgColor={typeColors[type.type.name].bgColor}
                  color={typeColors[type.type.name].color}
                >
                  {type.type.name}
                </Tag>
              ))}
            </HStack>
            <Divider />
            {/* 詳細 */}
            <TableContainer overflowX="hidden">
              <Table variant="simple" size="sm">
                <Tbody>
                  <Tr>
                    <Td>重さ</Td>
                    <Td isNumeric>{(pokeData.value.weight / 10).toFixed(1)}kg</Td>
                  </Tr>
                  <Tr>
                    <Td>高さ</Td>
                    <Td isNumeric>{(pokeData.value.height / 10).toFixed(1)}m</Td>
                  </Tr>
                  {pokeData.value.abilities.map((ability, index) => (
                    <Tr key={index}>
                      <Td>{ability.is_hidden ? "隠れ" : ""}特性</Td>
                      <Td isNumeric>{ability.ability.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        ) : (
          <></>
        )
      )}
    </SimpleGrid>
  );
};
