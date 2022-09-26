import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { footerProps } from "./Footer.style";

export const Footer: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (isLoading) return <></>;
  return (
    <Box {...footerProps}>
      <Text >ポケモンおよびポケットモンスターのキャラクター名は、任天堂の商標です。</Text>
      <Text pt={2}>データソースのpokeAPIはPaul Hallettと世界中の他のPokéAPI 貢献者によって作成されました。</Text>
    </Box>
  );
};
