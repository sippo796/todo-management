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

## アプリケーションの使い方

### 新規作成

- トップ画面の新規登録ボタンを押下します
- タスク新規作成画面が表示されるので、内容を入力し登録ボタンを押下します

### 編集・削除

- トップ画面のタスク一覧から、編集したいタスクをダブルクリックします
- タスク編集・削除画面が表示されるので、内容を更新し更新ボタンを押下します。
- 削除する場合はタスク編集・削除画面で削除ボタンを押下します。

### ステータスの変更

- トップ画面のタスク一覧から、変更したいタスクのステータスを選択します。

### ソート

- トップ画面のタスク一覧のタイトル部で、ソートしたいタイトルをクリックします。
- クリックするごとに昇順・降順が入れ替わります。

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

## 注意事項

- PC でお試しください。モバイルではダブルクリックが動作しない場合があります。
- ブラウザの DevTool で実行する場合、PC モードにしてください。
