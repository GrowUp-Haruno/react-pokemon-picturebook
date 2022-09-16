import { ButtonProps } from "@chakra-ui/react";
import { MouseEventHandler, useState, useEffect, ChangeEventHandler } from "react";
import { initLimit, initPagenationquantity } from "../../setting";

// 型定義
type usePagenationTypes = (
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>,
  pokeCount: number
) => {
  pagenationSetting: {
    uriLimit: number;
    pageTotal: number;
    pagePosition: number;
  };
  handlePrevPage: MouseEventHandler<HTMLButtonElement>;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
  handleChangeSelect: ChangeEventHandler<HTMLSelectElement>;
  createPagenation: () => Array<{
    jumpNumber: number;
    props: ButtonProps;
  }>;
};

export const usePagenation: usePagenationTypes = (pokemonGet, pokeCount) => {
  const [pagenationSetting, setPagenationSetting] = useState<{
    uriLimit: number;
    pageTotal: number;
    pagePosition: number;
  }>({
    uriLimit: initLimit,
    pageTotal: 0,
    pagePosition: 1,
  });

  const handlePrevPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { pagePosition, uriLimit } = pagenationSetting;
    const newPosition = pagePosition - 1;
    const uriOffset = (newPosition - 1) * uriLimit;
    pokemonGet(`https://pokeapi.co/api/v2/pokemon/?offset=${uriOffset}&limit=${uriLimit}`).catch((error) => {
      console.log(error);
    });
    setPagenationSetting((prev) => {
      if (prev.pagePosition <= 1) return { ...prev };
      return { ...prev, pagePosition: newPosition };
    });
  };

  const handleNextPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { pagePosition, uriLimit } = pagenationSetting;
    const newPosition = pagePosition + 1;
    const uriOffset = (newPosition - 1) * uriLimit;
    pokemonGet(`https://pokeapi.co/api/v2/pokemon/?offset=${uriOffset}&limit=${uriLimit}`).catch((error) => {
      console.log(error);
    });
    setPagenationSetting((prev) => {
      if (prev.pagePosition >= prev.pageTotal) return { ...prev };
      return { ...prev, pagePosition: newPosition };
    });
  };

  const createPagenation: () => Array<{
    jumpNumber: number;
    props: ButtonProps;
  }> = () => {
    const { pagePosition, pageTotal } = pagenationSetting;
    const halfQuantity = Math.ceil(initPagenationquantity / 2);
    const offset: number =
      pagePosition <= halfQuantity
        ? 1
        : pagePosition > pageTotal - halfQuantity
        ? pageTotal - initPagenationquantity + 1
        : pagePosition - halfQuantity + 1;
    // pageTotalがinitPagenationquantityよりも少ない場合の対応
    const adjPageTotal = initPagenationquantity < pageTotal ? initPagenationquantity : pageTotal;
    return [...Array(adjPageTotal)].map<{
      jumpNumber: number;
      props: ButtonProps;
    }>((_, i) => {
      return {
        jumpNumber: i + offset,
        props: {
          onClick: (e) => {
            e.preventDefault();
            const { uriLimit } = pagenationSetting;
            const newPosition = i + offset;
            const uriOffset = (newPosition - 1) * uriLimit;
            pokemonGet(`https://pokeapi.co/api/v2/pokemon/?offset=${uriOffset}&limit=${uriLimit}`).catch((error) => {
              console.log(error);
            });
            setPagenationSetting((prev) => {
              return { ...prev, pagePosition: newPosition };
            });
          },
          colorScheme: i + offset === pagenationSetting.pagePosition ? "red" : "gray",
        },
      };
    });
  };

  const handleChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    const newPosition = 1;
    const uriOffset = 0;
    const newUriLimit = Number(e.target.value);
    pokemonGet(`https://pokeapi.co/api/v2/pokemon/?offset=${uriOffset}&limit=${newUriLimit}`).catch((error) => {
      console.log(error);
    });
    setPagenationSetting(({ pageTotal }) => ({
      pageTotal,
      pagePosition: newPosition,
      uriLimit: newUriLimit,
    }));
  };

  useEffect(() => {
    setPagenationSetting((prev) => {
      return {
        ...prev,
        pageTotal: Math.ceil(pokeCount / prev.uriLimit),
      };
    });
  }, [pokeCount, pagenationSetting.uriLimit]);

  return {
    pagenationSetting,
    handlePrevPage,
    handleNextPage,
    handleChangeSelect,
    createPagenation,
  };
};
