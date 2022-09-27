import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { PokeData } from "../App/App.model";

type usePokeCardsType = () => {
  modalPokeData: PokeData | undefined;
  isOpen: boolean;
  handleModalOpen: (pokeDataValue: PokeData) => void;
  handleModalClose: () => void;
};

export const usePokeCards: usePokeCardsType = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [modalPokeData, setModalPokeData] = useState<PokeData>();
  const handleModalOpen: (pokeDataValue: PokeData) => void = (pokeDataValue) => {
    setModalPokeData(pokeDataValue);
    onOpen();
  };
  const handleModalClose: () => void = () => {
    setModalPokeData(undefined);
    onClose();
  };
  return { modalPokeData, isOpen, handleModalOpen, handleModalClose };
};
