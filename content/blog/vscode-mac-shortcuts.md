---
title: 'VSCode × Macで使える便利ショートカット集'
date: 2025-01-19
description: 'VSCodeとMacの必須ショートカットをまとめました。基本操作から言語別の便利な機能、カスタマイズ設定まで、開発効率を上げるTipsを紹介します。'
image: '/images/key.png'
---

# VSCode × Mac で使える便利ショートカット集

## はじめに

開発効率を大幅に向上させる VSCode と Mac のショートカットキーをまとめました。よく使うものを中心に、実際の開発シーンで役立つものをピックアップしています。

## VSCode の基本操作

### ファイル操作

- ファイル検索: `⌘ + P`
- コマンドパレット表示: `⌘ + Shift + P`
- 新規ファイル作成: `⌘ + N`
- ファイル保存: `⌘ + S`

### エディタ操作

- サイドバー表示/非表示: `⌘ + B`
- マルチカーソル: `⌘ + D`（選択した単語と同じものを順次選択）
- 行の複製: `Shift + Option + ↑/↓`
- 行の移動: `Option + ↑/↓`
- コメントアウト: `⌘ + /`

### 検索・置換

- ファイル内検索: `⌘ + F`
- プロジェクト内検索: `⌘ + Shift + F`
- 置換: `⌘ + Option + F`

### コード編集

- コードフォーマット: `Shift + Option + F`
- 定義へジャンプ: `⌘ + クリック`
- 参照箇所の表示: `Shift + F12`
- リファクタリング: `F2`（変数名の一括変更）

## Mac の便利なショートカット

### システム操作

- アプリケーション切り替え: `⌘ + Tab`
- Mission Control: `Control + ↑`
- アプリケーション終了: `⌘ + Q`
- スクリーンショット: `⌘ + Shift + 3`（画面全体）/ `⌘ + Shift + 4`（範囲選択）

### テキスト編集

- 行頭へ移動: `⌘ + ←`
- 行末へ移動: `⌘ + →`
- 単語単位で移動: `Option + ←/→`
- テキスト選択: 上記の移動コマンド + `Shift`

## おすすめのカスタマイズ設定

VSCode では、キーボードショートカットをカスタマイズすることができます。以下におすすめの設定をご紹介します：

1. ターミナル表示/非表示のショートカット

```
{
    "key": "cmd+`",
    "command": "workbench.action.terminal.toggleTerminal"
}
```

2. エディタの分割表示切り替え

```
{
    "key": "cmd+\\",
    "command": "workbench.action.splitEditor"
}
```

## まとめ

これらのショートカットを覚えることで、開発作業の効率が格段に上がります。最初は少しずつ使い始めて、徐々に習得していくことをおすすめします。

## 参考リンク

- [Visual Studio Code Keyboard shortcuts for macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
- [Mac keyboard shortcuts](https://support.apple.com/en-us/HT201236)

## 言語別ショートカット・スニペット

### JavaScript/TypeScript

- import 文の自動補完: `⌘ + .`
- 未使用の import を削除: `Shift + Option + O`
- 型定義へジャンプ: `F12`
- 型情報の表示: `⌘ + hover`
- async/await スニペット: `async⏎`
- try-catch スニペット: `try⏎`

### React/Next.js

- React コンポーネントスニペット: `rafce⏎`（Arrow Function Component）
- useEffect スニペット: `useEffect⏎`
- useState スニペット: `useState⏎`
- useRef スニペット: `🔗⏎`
- Next.js ページテンプレート: `npage⏎`
- getStaticProps テンプレート: `gsp⏎`

### CSS

- Emmet 展開: `Tab`（例：`m10⏎` → `margin: 10px;`）
- カラーピッカー: `⌘ + クリック`（カラーコード上で）
- CSS プロパティの補完: `Control + Space`
- flexbox スニペット: `df⏎`（`display: flex;`）
- grid スニペット: `dg⏎`（`display: grid;`）

## 便利な拡張機能とそのショートカット

### ESLint

- 全ファイルの Lint 実行: `⌘ + Shift + P` → `ESLint: Fix all auto-fixable problems`
- 現在のファイルの Lint: `⌘ + Shift + P` → `ESLint: Fix all auto-fixable problems in the file`

### Prettier

- 保存時の自動フォーマット設定

### GitLens

- 行の変更履歴表示: `Alt + B`
- ファイルの変更履歴表示: `⌘ + Shift + G` → `H`

## カスタマイズ設定例（settings.json）

```json
{
  // エディタの基本設定
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,

  // TypeScript/JavaScript設定
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",

  // React/Next.js向け設定
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },

  // ターミナル設定
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.fontFamily": "MesloLGS NF",

  // Git設定
  "git.enableSmartCommit": true,
  "git.confirmSync": false
}
```

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

## 上級者向け Tips

### タスク自動化

- タスクの作成（tasks.json）

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev",
      "type": "shell",
      "command": "npm run dev",
      "problemMatcher": []
    },
    {
      "label": "build",
      "type": "shell",
      "command": "npm run build",
      "problemMatcher": []
    }
  ]
}
```

### デバッグ設定（launch.json）

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Next.js: debug",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal"
    }
  ]
}
```

## 定期的なメンテナンス

- 拡張機能の更新確認
- 未使用の拡張機能の削除
- キーボードショートカットの見直し
- 設定の最適化

これらの設定や Tips を活用することで、より効率的な開発環境を構築できます。
