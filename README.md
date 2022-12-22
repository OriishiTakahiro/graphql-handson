# graphql-handson

## Up backend

```sh
$ docker-compose up -d
```

## Install Graphql Playground

```sh
$ brew install --cask graphql-playground
```

## Post sample query

Set url `http://localhost:8080/graphql`.

```graphql
query {
  findAllGames {
    gameID
    gameTitle
    about
    createdAt
  }
}
```

```graphql
mutation {
  createPost(gameID: "07fef228-e5e9-4207-8e57-19eec53037a4", score: 45, review: "クソゲ")
}
```

```graphql
query {
  findPosts(gameID: "07fef228-e5e9-4207-8e57-19eec53037a4"){
    score
    review
    author
    createdAt
  }
}
```

typeをネストすることも可能


```graphql
query {
  findAllGameWithPosts{
    gameTitle
    about
    posts {
      score
      review
    }
  }
}
```
