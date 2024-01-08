# TODO 管理アプリケーション

## セットアップ

- todo-management フォルダに移動し、以下のコマンドを実行します。

```
yarn
```

## アプリケーションの実行

### モックサーバーの起動

- todo-management フォルダで以下のコマンドを実行します。

```
yarn mock
```

- データの保存・読み取り先は todo-management/src/data/db.json です。

### アプリケーションの起動

- todo-management フォルダで以下のコマンドを実行します。

```
yarn dev
```

### ブラウザからアクセスする

- http://localhost:5173 にアクセスします。

- ポート番号 5173 が使用中の場合は他の番号になります。コマンドを起動したコンソールに起動 URL が表示されますので、上記 URL と異なる場合はそちらを使用してください。

## テスト実行

### ユニットテスト

- todo-management フォルダで以下のコマンドを実行します。

```
yarn test:uni
```

### インテグレーションテスト

- todo-management フォルダで以下のコマンドを実行します。

```
yarn test:int
```
