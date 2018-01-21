# post
> curl 'http://localhost:9000/tops' -H 'Content-Type: text/json' --data-binary '{"url": "https://www.infoq.com/jp/", "title": "tinfoq", "description": "teck blog"}'

# delete
> curl -X DELETE 'http://localhost:9000/tops/14'


## 開発めも

### シークレットキーの発行
> sbt playGenerateSecret
発行したキーをapplication.confの`play.crypto.secret`に設定する
### デプロイ
ビルドする
> sbt dist
target/universalにデプロイ資源が全て入ったzipが出力される。実行する場合はzipを解凍後binディレクトリにある起動スクリプトを実行する。