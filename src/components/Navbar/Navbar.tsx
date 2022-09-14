import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { navbarProps } from "./Navbar.style";

export const Navbar: FC = () => {
  return <Flex {...navbarProps}>ポケモン図鑑</Flex>;
};
