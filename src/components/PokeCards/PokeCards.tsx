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
} from "@chakra-ui/react";
import { FC } from "react";
import { PokeDataDetailType } from "../App/App.model";

import { Card } from "../Card/Card";
import { pokecardsProps } from "./PokeCards.style";

export const PokeCards: FC<{
  pokeDataDetails: Array<PromiseSettledResult<PokeDataDetailType>>;
  isLoading: boolean;
}> = ({ pokeDataDetails, isLoading }) => {
  console.log(pokeDataDetails);
  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size={["md", "lg", "xl"]} />
        </Center>
      ) : (
        <SimpleGrid {...pokecardsProps}>
          {pokeDataDetails.map((pokeDataDetail) =>
            pokeDataDetail.status === "fulfilled" ? (
              <Card key={pokeDataDetail.value.data.name}>
                {/* 画像 */}
                <Image src={pokeDataDetail.value.data.sprites.front_default} alt={pokeDataDetail.value.data.name} />
                {/* 名前 */}
                <Heading as="h2" size="lg">
                  {pokeDataDetail.value.data.name}
                </Heading>
                {/* 属性 */}
                <HStack spacing={4}>
                  {pokeDataDetail.value.data.types.map((type, i) => (
                    <Tag key={type.type.name} size="md">
                      {type.type.name}
                    </Tag>
                  ))}
                </HStack>
                <Divider />
                <TableContainer w="100%">
                  <Table variant="unstyled" size='sm'>
                    <Tbody>
                      <Tr>
                        <Td>重さ</Td>
                        <Td>{(pokeDataDetail.value.data.weight / 10).toFixed(1)}kg</Td>
                      </Tr>
                      <Tr>
                        <Td>高さ</Td>
                        <Td>{(pokeDataDetail.value.data.height / 10).toFixed(1)}m</Td>
                      </Tr>
                      {pokeDataDetail.value.data.abilities.map((ability, index) => (
                        <Tr key={index}>
                          <Td>{index === 1 ? "隠れ" : ""}特性</Td>
                          <Td>{ability.ability.name}</Td>
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
      )}
    </>
  );
};
