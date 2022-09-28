# memo
```graphql
query MyQuery($_eq: String = "ja-Hrkt") {
  pokemonspecies: pokemon_v2_pokemonspecies(limit: 1) {
    pokemons: pokemon_v2_pokemons {
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          jpType: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: $_eq}}}) {
            name
          }
        }
      }
      weight
      height
      pokemonabilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          jpAbility: pokemon_v2_abilitynames(where: {pokemon_v2_language: {name: {_eq: $_eq}}}) {
            name
          }
        }
        is_hidden
      }
    }
  }
}
```


```gql
query MyQuery($_eq: String = "ja-Hrkt") { pokemonspecies: pokemon_v2_pokemonspecies(limit: 1) { pokemons: pokemon_v2_pokemons { weight height } }}
```

```shell
curl 'https://beta.pokeapi.co/graphql/v1beta' \
-H 'content-type: application/json' \
-H 'accept: */*' \
--compressed \
--data-binary @- << EOF
{
    "query": "query MyQuery(\$_eq: String = \"ja-Hrkt\") { pokemonspecies: pokemon_v2_pokemonspecies\(limit: 1\) { pokemons: pokemon_v2_pokemons { weight height } }}",
    "variables": null,
    "operationName":"MyQuery"
}
EOF
```