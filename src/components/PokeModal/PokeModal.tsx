import {
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { PokeData } from "../App/App.model";
import { typeColors } from "../PokeCards/PokeCards.style";
import { usePokeModal } from "./PokeModal.use";

export const PokeModal: FC<{
  modalPokeData: PokeData | undefined;
  isOpen: boolean;
  handleModalClose: () => void;
}> = ({ modalPokeData, isOpen, handleModalClose }) => {
  const { flavorTextIndex, handleVersionChange } = usePokeModal();
  if (modalPokeData === undefined) return <></>;
  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size={["sm", "md", "lg"]} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>No.{modalPokeData.id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6}>
            <HStack spacing={4}>
              <VStack>
                {/* 画像 */}
                <Image src={modalPokeData.sprites.front_default} alt={modalPokeData.name} h="96px" />
                {/* 名前 */}
                <Heading as="h2" size="lg">
                  {modalPokeData.name}
                </Heading>
                {/* 属性 */}
                <HStack spacing={4}>
                  {modalPokeData.types.map((type) => (
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
              </VStack>
              {/* 詳細 */}
              <TableContainer overflowX="hidden" flexGrow={1}>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td>重さ</Td>
                      <Td isNumeric>{(modalPokeData.weight / 10).toFixed(1)}kg</Td>
                    </Tr>
                    <Tr>
                      <Td>高さ</Td>
                      <Td isNumeric>{(modalPokeData.height / 10).toFixed(1)}m</Td>
                    </Tr>
                    {modalPokeData.abilities.map((ability, index) => (
                      <Tr key={index}>
                        <Td>{ability.is_hidden ? "隠れ" : ""}特性</Td>
                        <Td isNumeric>{ability.ability.name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </HStack>
            <Divider />
            <Text>{modalPokeData.flavorText[flavorTextIndex].flavor_text}</Text>
            <Select onChange={handleVersionChange}>
              {modalPokeData.flavorText.map((item, i) => (
                <option key={i} value={i}>
                  {item.version.name}
                </option>
              ))}
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleModalClose} size="sm">
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
