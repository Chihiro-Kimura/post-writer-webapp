---
title: 'GitとGitHubの使い方：初心者向け解説'
date: 2025-01-19
description: 'Gitの基本的なコマンドや操作方法、GitHubとの連携方法について、初学者向けにまとめた記事です。'
image: '/images/github.png'
---

# Git と GitHub の基本的な使い方

この記事は、私が初めて Git と GitHub を学び始めた時の備忘録です。基本的なコマンドや操作方法を忘れないようにメモとして残しておきます。同じように学び始めた方の参考になれば嬉しいです。

## Git と GitHub って何？

私の理解では：

- **Git**: プログラムのバージョン管理ツール（変更履歴を記録できる）
- **GitHub**: Git で管理したコードを Web 上で共有できるサービス

## 1. 最初にやること：Git のインストールと設定

1. [Git 公式サイト](https://git-scm.com/)からダウンロードしてインストール
2. 最初に必要な設定（ターミナルで実行）：

```
git config --global user.name "自分の名前"
git config --global user.email "自分のメールアドレス"
```

## 2. よく使う基本的な Git コマンド

### プロジェクトを始めるとき

```
# 新しいリポジトリを作る
git init

# ファイルを管理対象に追加
git add ファイル名
# または全部追加するなら
git add .

# 変更を記録（コミット）
git commit -m "変更内容の説明"
```

### 変更を確認するとき

```
# 変更状態を確認
git status

# 変更履歴を確認
git log
```

### GitHub と連携するとき

```
# GitHubのリポジトリと接続
git remote add origin https://github.com/自分のユーザー名/リポジトリ名.git

# GitHubに送信
git push -u origin main

# GitHubから取得
git pull origin main
```

### 作業を一時退避するとき

```
# 変更を一時保存
git stash

# 保存した作業を戻す
git stash pop
```

## 3. 私が Git を使う理由

- 📝 コードの変更履歴が残せる（失敗しても戻せる！）
- 💾 PC が壊れても大事なコードが GitHub に残っている
- 👥 他の人のコードを参考にできる

## 初学者としての気づき

- 最初は`git add`と`git commit`だけでも十分
- コマンドは少しずつ覚えていけば OK
- 分からないときは`git status`でよく確認する
- エラーが出ても焦らない（Google 検索が助けてくれる）

## まとめ

まだまだ勉強中ですが、基本的なコマンドを覚えるだけでもかなり便利に使えています。この記事も随時アップデートしていく予定です。

> **Note**: 2024 年現在、GitHub ではデフォルトブランチ名が`main`となっています。

## Topics

- Git
- GitHub
- バージョン管理
- 開発ツール
- コマンドライン

---

_私の学習記録として更新していきます_
