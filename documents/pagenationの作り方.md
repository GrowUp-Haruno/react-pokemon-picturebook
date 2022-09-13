# pagenation の作り方

10 ページ分のデータがある状態で、下記の条件でページネーションを作りたい場合の作成手順
1 ページ目なら 1,2,3,4,5
2 ページ目なら 1,2,3,4,5
3 ページ目なら 1,2,3,4,5
4 ページ目なら 2,3,4,5,6
5 ページ目なら 3,4,5,6,7
6 ページ目なら 4,5,6,7,8
7 ページ目なら 5,6,7,8,9
8 ページ目なら 6,7,8,9,10
9 ページ目なら 6,7,8,9,10
10 ページ目なら 6,7,8,9,10

## 第1段階:条件切り出し

1~3 ページ、4~7 ページ、8~10 ページでロジックが変わっているのがわかるので、下記のコードロジックが切り替わるかを確認する。

```ts
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const quantity = 5;
const halfQuantity = Math.ceil(quantity / 2);

for (let position = 1; position <= pages.length ; position++) {
  if (position <= halfQuantity) console.log(`${position}:pattern1`);
  else if (position > pages.length - halfQuantity)
    console.log(`${position}:pattern2`);
  else console.log(`${position}:pattern3`);
}
```

### 実行結果
```
> "1:pattern1"
> "2:pattern1"
> "3:pattern1"
> "4:pattern3"
> "5:pattern3"
> "6:pattern3"
> "7:pattern3"
> "8:pattern2"
> "9:pattern2"
> "10:pattern2"
```

## 第2段階:sliceの引数設定

```ts
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const quantity = 5;
const halfQuantity = Math.ceil(quantity / 2);

for (let position = 1; position <= 10; position++) {
  if (position <= halfQuantity) console.log(pages.slice(0, quantity));
  else if (position > pages.length - halfQuantity)
    console.log(pages.slice(pages.length - quantity));
  else
    console.log(
      pages.slice(position - halfQuantity, position - halfQuantity + quantity)
    );
}
```

## 第３段階：関数化

```ts
const createPagenation = () => {
  for (let position = 1; position <= 10; position++) {
    if (position <= halfQuantity) console.log(pages.slice(0, quantity));
    else if (position > pages.length - halfQuantity)
      console.log(pages.slice(pages.length - quantity));
    else
      console.log(
        pages.slice(position - halfQuantity, position - halfQuantity + quantity)
      );
  }
}
```
