# psqlでのselect時の縦、横表示切り替え
> \x


## linkをたどっていない物を取得
```
select id, top_id, url, text, add_date
          from top_link
          where
            id not in (select link_id from link_text)
and add_date > '2017-02-02 13:30'
and top_id = 35
```

## クロールに失敗したURLを取得
> select url from top_link where id in (select link_id from link_text where result = 1)