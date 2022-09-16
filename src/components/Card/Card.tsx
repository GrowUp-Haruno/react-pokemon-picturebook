import { VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { cardProps } from "./Card.style";

export const Card: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <VStack {...cardProps} spacing={2} padding={4} w="240px">
      {children}
    </VStack>
  );
};
