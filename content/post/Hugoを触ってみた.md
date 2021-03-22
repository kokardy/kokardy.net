---
title: "はじめてのHugo"
date: 2021-03-20T16:37:35+09:00
draft: true
---

# Hugoを触ってみた

## install

git clone で説明してあるものが多いけど、Go言語製ということはgo installできるはず。

というわけで以下のコマンド。

```bash
$ go install github.com/gohugoio/hugo@latest
$ export PATH="$PATH":"$GOPATH"/bin #必要なら
$ hugo version
hugo v0.81.0 linux/amd64 BuildDate=unknown
```

## サイト作成

```bash
#新規サイト作成
$ hugo new site kokardy.net
#記事のマークダウンファイルを作成
$ hugo new post/Hugoを触ってみた.md
```

## theme

テーマ選びは難しい。
テーマによって、config.tomlが変わってきたりするらしい。
今回はbinarioを選んだ(適当)。

```bash
$ cd kokardy.net
$ git submodule add https://github.com/vimux/binario themes/binario
```

## Web Font

何を思ったか、Webフォントを使ってみようと思いついた。

今回は、Googleのさわらびフォントを使う。

### cssファイル

custom.cssはthemes/binario/assets/css/に置く。

custom.css:
```css
body{
font-family:"Sawarabi Mincho";
}
```

### linkタグ

```html
<link href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho" rel="stylesheet">
```
をページに挿入しないといけない。

config.toml中で
```toml
customCSS = ["css/custom.css", "https://fonts.googleapis.com/css?family=Sawarabi+Mincho"]
```
とURLを追加するとlinkタグが挿入される。


