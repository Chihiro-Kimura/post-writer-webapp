---
title: '"React初学者の備忘録：基本機能とよく使うパターン集"'
date: 2025-01-19
description: 'Reactの基本的な機能やパターン、よく使うHooksなどについて、初学者向けにまとめた記事です。'
image: '/images/react.png'
---

# React 開発で覚えておきたい基本のキホン

この記事は、私が React を学び始めてから気をつけていることや、よく使う機能をメモとして残しておくものです。まだまだ勉強中ですが、同じように学習を始めた方の参考になれば嬉しいです。

## React って何がいいの？

私の理解では：

- **コンポーネント指向**: UI をパーツ化して再利用できる
- **仮想 DOM**: 効率的な画面更新ができる
- **豊富なエコシステム**: 便利なライブラリがたくさんある

## 1. よく使う Hooks

### useState

状態管理の基本です。これだけは必ず覚えておきたい！

```jsx
const [count, setCount] = useState(0);

// 使い方の例
<button onClick={() => setCount(count + 1)}>カウント: {count}</button>;
```

### useEffect

副作用（データフェッチなど）を扱うときに使います：

```jsx
useEffect(() => {
  // データを取得する処理
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    setData(data);
  };

  fetchData();
}, []); // 空の依存配列→マウント時のみ実行
```

### useRef

DOM を直接参照したいときによく使います：

```jsx
const inputRef = useRef(null);

// 使い方の例
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>
  フォーカスを当てる
</button>
```

> **Note**: useRef の詳しい使い方や実践的なユースケースについては、[useRef の使い方完全ガイド：私の理解まとめ](./useref-detail)にまとめています。

## 2. コンポーネントの基本パターン

### 子コンポーネントに props を渡す

```jsx
// 親コンポーネント
const Parent = () => {
  return <Child name="React" />;
};

// 子コンポーネント
const Child = ({ name }) => {
  return <p>Hello, {name}!</p>;
};
```

### イベントハンドリング

```jsx
const Button = () => {
  const handleClick = () => {
    console.log('クリックされました！');
  };

  return <button onClick={handleClick}>クリック</button>;
};
```

## 3. 私がよく使う React ライブラリ

- 🎨 **Tailwind CSS**: 直感的なユーティリティファーストの CSS
- 🛣️ **react-router-dom**: ページ遷移に必須
- 🔄 **axios**: API リクエストが簡単
- 📋 **react-hook-form**: フォーム処理が楽
- 🔍 **Redux Toolkit**: 定番の状態管理ライブラリ

## 4. 気をつけていること

- コンポーネントは小さく保つ
- 状態管理は必要最小限に
- キー忘れずに（map のとき）
- 副作用の依存配列をちゃんと書く
- コンソールのエラーはすぐに対処

## 5. 開発環境のお気に入り設定

Vite で新規プロジェクトを作成すると、以下のような設定が自動で追加されます：

```json
// package.json の基本設定
{
  "scripts": {
    "dev": "vite", // 開発サーバーの起動
    "build": "vite build", // 本番用ビルド
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0", // コード品質チェック
    "preview": "vite preview" // ビルド後のプレビュー
  }
}
```

### 私がよく追加する設定

```json
{
  "scripts": {
    // ... 既存のスクリプト ...
    "format": "prettier --write 'src/**/*.{js,jsx}'", // コード整形
    "type-check": "tsc --noEmit" // TypeScriptの型チェック（TSを使う場合）
  }
}
```

### 各コマンドの使い方

- `npm run dev`: 開発時はこれを起動
- `npm run build`: デプロイ前にビルド
- `npm run preview`: ビルドしたものを確認
- `npm run lint`: コードチェック
- `npm run format`: コードの整形（Prettier 導入後）

> **Tip**: VSCode を使っている場合は、保存時に自動でフォーマットされるように設定しておくと便利です。

> **Note**: この記事は 2025 年現在の React 19.x をベースに書いています。

## Topics

- React
- フロントエンド
- JavaScript
- 状態管理
- Web 開発

---

_私の学習記録として更新していきます_
