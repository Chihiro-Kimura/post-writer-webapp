---
title: 'useRef の使い方完全ガイド：私の理解まとめ'
date: 2025-01-19
description: 'ReactのuseRefフックの使い方や実践的なユースケースについて詳しく解説した記事です。'
image: '/images/link-bold-duotone.png'
---

# useRef の使い方完全ガイド：私の理解まとめ

この記事は、React の useRef について私が学んだことをまとめたものです。基本的な使い方から実践的なユースケースまで、自分の理解を整理しています。

## useRef とは？

私の理解では、useRef には主に 2 つの使い方があります：

1. **DOM 要素への直接アクセス**
2. **再レンダリングを引き起こさない値の保持**

## 1. よくあるユースケース

### フォーカス制御

```jsx
const inputRef = useRef(null);

// 使い方の例
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>
  フォーカスを当てる
</button>
```

### 動画・音声の再生制御

```jsx
const videoRef = useRef(null);

<video ref={videoRef}>
  <source src="example.mp4" type="video/mp4" />
</video>
<button onClick={() => videoRef.current.play()}>再生</button>
<button onClick={() => videoRef.current.pause()}>停止</button>
```

### スクロール位置の操作

```jsx
const scrollRef = useRef(null);

<div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
  <p>長いコンテンツ...</p>
</div>
<button onClick={() => scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })}>
  トップへ戻る
</button>
```

## 2. 値を保持するケース

再レンダリングしても値を保持したい場合にも使えます：

```jsx
const countRef = useRef(0);

// この値は変更しても再レンダリングは発生しない
countRef.current = countRef.current + 1;
```

## 3. useRef を使う際の注意点

- 🚫 DOM 操作は最小限に
- ⚠️ useEffect と組み合わせる際は依存配列に注意
- 🤔 状態管理には基本的に useState を使う
- ✅ パフォーマンス最適化の際は要検討

## まとめ

useRef は強力なツールですが、必要な時だけ使うようにしています。特に DOM 操作は必要最小限に抑えるのがベストだと学びました。

## Topics

- React
- useRef
- DOM 操作
- Hooks
- フロントエンド

---

_学習が進んだら更新していきます_
