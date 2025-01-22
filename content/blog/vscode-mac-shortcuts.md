---
title: 'VSCode × Macで使える便利ショートカット集 - React/Next.js開発者向け'
date: 2025-01-19
description: 'React/Next.js開発に特化したVSCodeとMacの必須ショートカットをまとめました。開発効率を大幅に向上させる実践的なTipsを紹介します。'
image: '/images/key.png'
---

# VSCode × Mac で使える便利ショートカット集 - React/Next.js 開発者向け

## はじめに

React/Next.js 開発における生産性を大幅に向上させる VSCode と Mac のショートカットキーをまとめました。実務での開発効率を上げる実践的なショートカットを中心に紹介します。

## React/Next.js 開発の必須ショートカット

### コンポーネント開発

- コンポーネントの作成: `rafce⏎` (React Arrow Function Component)
- Props 型定義の追加: `tsrafce⏎` (TypeScript React Arrow Function Component)
- useState の追加: `useState⏎`
  ```typescript
  const [state, setState] = useState<type>(initialValue);
  ```
- useEffect の追加: `useEffect⏎`
  ```typescript
  useEffect(() => {
    // 処理
  }, [dependencies]);
  ```
- useRef の追加: `useRef⏎`
  ```typescript
  const ref = useRef<HTMLElementType>(null);
  ```

### Next.js 固有の機能

- ページテンプレート: `npage⏎`
  ```typescript
  export default function Page() {
    return <div>Page</div>;
  }
  ```
- データフェッチング関数:
  - `gsp⏎` (getStaticProps)
  - `gssp⏎` (getServerSideProps)
  - `gsp⏎` (generateStaticParams)

### 型定義とインポート

- 型定義の表示: `⌘ + hover`
- 定義へジャンプ: `F12`
- インポートの自動補完: `⌘ + .`
- 未使用インポートの削除: `⌘ + Shift + O`
- インポートの並べ替え: `Option + Shift + O`

## VSCode の React 開発向け設定

### 推奨拡張機能

1. ES7+ React/Redux/React-Native snippets

   - コンポーネントスニペット
   - Hooks スニペット
   - PropTypes スニペット

2. Pretty TypeScript Errors

   - TypeScript エラーの可読性向上
   - エラー箇所の詳細な説明

3. Auto Import
   - インポート文の自動補完
   - パス補完の強化

### settings.json の推奨設定

```json
{
  // React/TypeScript設定
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.autoImports": true,

  // JSX/TSX設定
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },

  // フォーマット設定
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

## デバッグとトラブルシューティング

### デバッグショートカット

- ブレークポイントの設定/解除: `F9`
- デバッグの開始: `F5`
- ステップオーバー: `F10`
- ステップイン: `F11`
- デバッグの停止: `Shift + F5`

### launch.json 設定（Next.js）

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

## 効率的なコード編集

### マルチカーソル操作

- 同じ単語を順次選択: `⌘ + D`
- 同じ単語をすべて選択: `⌘ + Shift + L`
- カーソルを上下に追加: `⌘ + Option + ↑/↓`
- 矩形選択: `Shift + Option + ドラッグ`

### コード整形

- インデント調整: `⌘ + [` / `⌘ + ]`
- 行の移動: `Option + ↑/↓`
- 行のコピー: `Option + Shift + ↑/↓`
- ブロックの折りたたみ/展開: `⌘ + Option + [` / `⌘ + Option + ]`

## Git 操作

### GitLens を使用したコード履歴

- 行の変更履歴表示: `Option + B`
- ファイルの変更履歴: `⌘ + Shift + G` → `H`
- 変更の比較: `Option + クリック`

### Source Control パネル

- Git パネルの表示: `⌘ + Shift + G`
- ステージの追加/解除: `Space`
- コミット: `⌘ + Enter`
- プッシュ: `⌘ + Shift + P` → `Git: Push`

## まとめ

これらのショートカットを活用することで、React/Next.js 開発の効率が大幅に向上します。特に頻繁に使用する操作から始めて、徐々にレパートリーを増やしていくことをお勧めします。

## 参考リンク

- [VSCode Keyboard Shortcuts for Mac](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Next.js Documentation](https://nextjs.org/docs)

## 言語別ショートカット・スニペット

### JavaScript/TypeScript

- import 文の自動補完: `⌘ + .`
- 未使用の import を削除: `Shift + Option + O`
- 型定義へジャンプ: `F12`
- 型情報の表示: `⌘ + hover`
- async/await スニペット: `async⏎`
- try-catch スニペット: `try⏎`

### CSS

- Emmet 展開: `Tab`（例：`m10⏎` → `margin: 10px;`）
- カラーピッカー: `⌘ + クリック`（カラーコード上で）
- CSS プロパティの補完: `Control + Space`
- flexbox スニペット: `df⏎`（`display: flex;`）
- grid スニペット: `dg⏎`（`display: grid;`）

## トラブルシューティング

### よくある問題と解決方法

1. ショートカットが効かない

- キーボードショートカットの競合を確認
  1. `⌘ + K` → `⌘ + S` でショートカット一覧を表示
  2. 検索バーで該当のショートカットを検索
  3. 競合している場合は再設定

2. 補完が効かない

- 言語サービスの再起動
  1. `⌘ + Shift + P`
  2. `Reload Window` を実行

3. フォーマットが適用されない

- フォーマッタの設定確認
  1. `.prettierrc` の存在確認
  2. デフォルトフォーマッタの設定確認
  3. `editor.formatOnSave` の確認

## 定期的なメンテナンス

- 拡張機能の更新確認
- 未使用の拡張機能の削除
- キーボードショートカットの見直し
- 設定の最適化

これらの設定や Tips を活用することで、より効率的な開発環境を構築できます。
