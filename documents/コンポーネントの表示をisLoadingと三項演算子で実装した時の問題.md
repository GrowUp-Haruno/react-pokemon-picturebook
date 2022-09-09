# コンポーネントの表示をisLoadingと三項演算子で実装した時の問題

## 
```tsx
return(
  <>
    {
      isLoading?<></>:<Componennt1 />
    }
  </>
)
```
Componennt1内部でステートを作っていた場合、isLoadingでコンポーネントを切り替えると
loadingの度にステートが初期化されてしまう（コンポーネントがアンマウントされてしまうため）