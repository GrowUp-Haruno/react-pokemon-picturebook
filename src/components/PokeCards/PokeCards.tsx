import { FC } from 'react';
import { PokeDataDetailType } from '../App/App.model';

import { Card } from '../Card/Card';
import './pokecards.css';

export const PokeCards: FC<{
  pokeDataDetails: Array<PromiseSettledResult<PokeDataDetailType>>;
  isLoading: boolean;
}> = ({ pokeDataDetails, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="pokecards">
          {pokeDataDetails.map((pokeDataDetail) =>
            pokeDataDetail.status === 'fulfilled' ? (
              <Card key={pokeDataDetail.value.data.name}>
                <div className="pokeImg">
                  <img
                    src={pokeDataDetail.value.data.sprites.front_default}
                    alt={pokeDataDetail.value.data.name}
                  />
                </div>
                <h3 className="pokeName">{pokeDataDetail.value.data.name}</h3>
                <div className="pokeTypes">
                  <p>タイプ</p>
                  {pokeDataDetail.value.data.types.map((type) => (
                    <div key={type.type.name}>
                      <span className="typeName">{type.type.name}</span>
                    </div>
                  ))}
                </div>
                <div className="pokeInfo">
                  <div className="pokeData">
                    <p className="dataTitle">
                      重さ: {pokeDataDetail.value.data.weight}
                    </p>
                  </div>
                  <div className="pokeData">
                    <p className="dataTitle">
                      高さ: {pokeDataDetail.value.data.height}
                    </p>
                  </div>
                  <div className="pokeData">
                    {pokeDataDetail.value.data.abilities.map(
                      (ability, index) => (
                        <p
                          className="dataTitle"
                          key={`${pokeDataDetail.value.data.name}-${ability.ability.name}`}
                        >{`アビリティ${index + 1}: ${ability.ability.name}`}</p>
                      )
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <></>
            )
          )}
        </div>
      )}
    </>
  );
};
