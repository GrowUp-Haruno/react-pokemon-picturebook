import { SimpleGridProps, TagProps } from "@chakra-ui/react";

export const pokecardsProps: SimpleGridProps = {
  columns: [1, 2, 3],
  spacing: 8,
  pt: 8,
};

export const typeColors: { [x in string]: { bgColor: string; color: TagProps["color"] } } = {
  むし: { bgColor: "#a8b820", color: "gray.50" },
  あく: { bgColor: "#705848", color: "gray.50" },
  ドラゴン: { bgColor: "#7860e0", color: "gray.50" },
  でんき: { bgColor: "#f8c030", color: "gray.600" },
  フェアリー: { bgColor: "#f8b0d0", color: "gray.600" },
  かくとう: { bgColor: "#a05038", color: "gray.50" },
  ほのお: { bgColor: "#f05030", color: "gray.50" },
  ひこう: { bgColor: "#98a8f0", color: "gray.600" },
  ゴースト: { bgColor: "#6060b0", color: "gray.50" },
  くさ: { bgColor: "#78c850", color: "gray.50" },
  じめん: { bgColor: "#d0b058", color: "gray.50" },
  こおり: { bgColor: "#58c8e0", color: "gray.50" },
  ノーマル: { bgColor: "#a8a090 ", color: "gray.50" },
  どく: { bgColor: "#b058a0", color: "gray.50" },
  エスパー: { bgColor: "#f870a0", color: "gray.50" },
  いわ: { bgColor: "#b8a058", color: "gray.50" },
  ダーク: { bgColor: "#705848", color: "gray.50" },
  はがね: { bgColor: "#a8a8c0", color: "gray.50" },
  "？？？": { bgColor: "#a8a090", color: "gray.50" },
  みず: { bgColor: "#3898f8", color: "gray.50" },
};
