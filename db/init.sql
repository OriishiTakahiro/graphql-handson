CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE "games" (
  "gameID" UUID DEFAULT uuid_generate_v4(),
  "gameTitle" VARCHAR(255) NOT NULL,
  "about" TEXT NOT NULL,
  "createdAt" time with time zone default CURRENT_TIMESTAMP,
  PRIMARY KEY ("gameID")
);

CREATE TABLE "posts" (
  "postID" UUID DEFAULT uuid_generate_v4(),
  "gameID" UUID NOT NULL,
  "score" SMALLINT NOT NULL check(-1 < score and score < 101),
  "review" TEXT,
  "author" VARCHAR(255) default 'ナナシさん',
  "createdAt" time with time zone default CURRENT_TIMESTAMP,
  PRIMARY KEY ("postID"),
  FOREIGN KEY ("gameID") REFERENCES games("gameID")
);

INSERT INTO games ("gameTitle", "about") VALUES
  ('百物語 -徳島編-', 'あの大人気ホラーADV 百物語26作目!!'),
  ('サラーリマンアドベンチャー', '鬼才、居石峻寛が送る異世界転生RPG!!'),
  ('IT土方シミュレーター', '今度のあなたはIT土方!炎上に次ぐ炎上を鎮圧せよ!');
