import { MouseEventHandler, useState, useEffect, CSSProperties } from 'react';
import { initLimit, initPagenationquantity, initPosition } from '../../setting';

type usePagenationTypes = (
  pokemonGet: (pokemonListURI: string) => Promise<number | undefined | null>,
  pokeCount: number
) => {
  uriSetting: {
    limit: number;
    position: number;
  };
  pagenationSetting: {
    pageTotal: number;
    pagePosition: number;
  };
  handlePrevPage: MouseEventHandler<HTMLButtonElement>;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
  createPagenation: () => Array<{
    jumpNumber: number;
    style: CSSProperties;
    handleJumpPage: MouseEventHandler<HTMLButtonElement>;
  }>;
};

export const usePagenation: usePagenationTypes = (pokemonGet, pokeCount) => {
  const [uriSetting, setUriSetting] = useState<{
    limit: number;
    position: number;
  }>({
    limit: initLimit,
    position: initPosition,
  });

  const [pagenationSetting, setPagenationSetting] = useState<{
    pageTotal: number;
    pagePosition: number;
  }>({
    pageTotal: 0,
    pagePosition: 1,
  });

  useEffect(() => {
    setPagenationSetting(({ pagePosition }) => {
      console.log('setPagenationSetting complete');

      return {
        pageTotal: Math.ceil(pokeCount / uriSetting.limit),
        pagePosition,
      };
    });
  }, [pokeCount, uriSetting.limit]);

  const handlePrevPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (uriSetting.position !== 0) {
      setUriSetting(({ limit, position }) => {
        const newPosition = position - limit < 0 ? 0 : position - limit;
        pokemonGet(
          `https://pokeapi.co/api/v2/pokemon/?offset=${newPosition}&limit=${limit}`
        ).catch((error) => {
          console.log(error);
        });
        return {
          limit,
          position: position - limit < 0 ? 0 : position - limit,
        };
      });

      setPagenationSetting(({ pageTotal, pagePosition }) => ({
        pageTotal,
        pagePosition: pagePosition - 1,
      }));
    }
  };

  const handleNextPage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (uriSetting.position + uriSetting.limit <= pokeCount) {
      setUriSetting(({ limit, position }) => {
        const newPosition: number = position + limit;
        pokemonGet(
          `https://pokeapi.co/api/v2/pokemon/?offset=${newPosition}&limit=${limit}`
        ).catch((error) => {
          console.log(error);
        });
        return {
          limit,
          position: newPosition,
        };
      });
      setPagenationSetting(({ pageTotal, pagePosition }) => ({
        pageTotal,
        pagePosition: pagePosition + 1,
      }));
    }
  };

  const createPagenation: () => Array<{
    jumpNumber: number;
    style: CSSProperties;
    handleJumpPage: MouseEventHandler<HTMLButtonElement>;
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
    const adjPageTotal =
      initPagenationquantity < pageTotal ? initPagenationquantity : pageTotal;

    return [...Array(adjPageTotal)].map((_, i) => {
      return {
        jumpNumber: i + offset,
        style: {
          backgroundColor:
            i + offset === pagenationSetting.pagePosition ? 'red' : 'white',
          border: '1px solid gray',
        },
        handleJumpPage: (e) => {
          e.preventDefault();
          setUriSetting(({ limit }) => {
            const newPosition = limit * (i + offset - 1);
            pokemonGet(
              `https://pokeapi.co/api/v2/pokemon/?offset=${newPosition}&limit=${limit}`
            ).catch((error) => {
              console.log(error);
            });
            return {
              limit,
              position: newPosition,
            };
          });
          setPagenationSetting(({ pageTotal }) => ({
            pageTotal,
            pagePosition: i + offset,
          }));
        },
      };
    });
  };

  return {
    uriSetting,
    pagenationSetting,
    handlePrevPage,
    handleNextPage,
    createPagenation,
  };
};
