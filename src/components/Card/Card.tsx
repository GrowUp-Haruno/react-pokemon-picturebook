import { StackProps, VStack } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { cardProps } from "./Card.style";

export const Card: FC<{
  children: ReactNode;
  onClick: StackProps["onClick"];
}> = ({ children, onClick }) => {
  return (
    <VStack {...cardProps} onClick={onClick}>
      {children}
    </VStack>
  );
};
