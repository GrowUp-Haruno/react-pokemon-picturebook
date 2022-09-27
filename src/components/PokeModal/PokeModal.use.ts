import { SelectProps } from "@chakra-ui/react";
import { useState } from "react";

type usePokeModalType = () => {
  flavorTextIndex: number;
  handleVersionChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const usePokeModal: usePokeModalType = () => {
  const [flavorTextIndex, setFlavorTextIndex] = useState<number>(0);
  const handleVersionChange: SelectProps["onChange"] = (e) => {
    setFlavorTextIndex(Number(e.target.value));
  };
  return { flavorTextIndex, handleVersionChange };
};
