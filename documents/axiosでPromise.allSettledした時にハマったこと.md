# axiosでPromise.allSettledした時にハマったこと

## TypeScriptでawait Promise.allSettled()したデータを扱う方法
```ts
    (async () => {
      try {
        /** https://pokeapi.co/api/v2/pokemon/からのレスポンス */
        const pokemonDataResults: Array<{ url: string }> = (
          await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
        ).data.results;

        const results = await Promise.allSettled(
          pokemonDataResults.map((result) => axios({url:result.url,method:"GET"))
        );
    })();
```
```ts
results.forEach(result=>console.log(result.))
```
と書いた際の補完候補はstatusのみとなる。
この時点のresultの型は次の様なオブジェクトのユニオン型となっているため、タグ付きユニオンでオブジェクトを判別する必要がある。
```ts
{status: "fulfilled",value:{data:...}} | {status: "rejected",reason:...}
```
