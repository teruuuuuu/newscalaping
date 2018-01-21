## プロジェクト内のファイル構成の方針
### コンポーネントの区分
 - page: 一度に表示する単位で複数のパーツからなりたっている。ページ内のパーツをどうしようするかレベルの制御を行う。page自体も他のページに配置されることを想定する。
 - parts: データを描画するためのコンポーネント、データ(propsおよびstate)の修正は行はずアクションの呼び出しが必要な場合はpageに処理を返す

### react自体の設定
 - reducer: storeする対象のreducerのファイルおよびreducerを束ねるindex.tsxを配置する。
 - store/store-config: store（reducerおよび、middleware）の設定を行う。
 - config/request.url.json: リクエストのurlを設定する。開発用、本番用でファイルを分けておいて起動時にconfig/index.jsが環境毎のenv.jsonを読み込む様にする

# typescrpitでのreact開発注意点
typescript側で型を判断できる様に@typesをinstallしておく
> npm install --save @types/コンポーネント名
react-data-gridの場合は
> npm install --save @types/react-data-grid