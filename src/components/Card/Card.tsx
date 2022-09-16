import { VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { cardProps } from "./Card.style";

export const Card: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <VStack {...cardProps}>{children}</VStack>;
};
