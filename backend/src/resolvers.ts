import { Pool } from "pg";
import {
  Kysely,
  PostgresDialect,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from "kysely";
import dotenv from "dotenv";

dotenv.config();

type Game = {
  gameID?: string;
  gameTitle: string;
  about: string;
  createdAt?: string;
};

type Post = {
  postID?: string;
  gameID: string;
  score: number;
  review?: string;
  author?: string;
  createdAt?: string;
};

type Database = {
  games: Game;
  posts: Post;
};

const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    }),
  }),
});

const resolvers = {
  Query: {
    findAllGames: async (_: unknown) => {
      const games = await db.selectFrom("games").selectAll().execute();
      return games;
    },
    findPosts: async (_: unknown, { gameID }: { gameID: string }) => {
      const posts = await db
        .selectFrom("posts")
        .selectAll()
        .where("posts.gameID", "=", gameID)
        .execute();
      return posts;
    },
  },
  Mutation: {
    createPost: async (
      _: unknown,
      args: { gameID: string; score: number; review: string; author: string }
    ) => {
      db.insertInto("posts").values(args).execute();
      return "ok";
    },
  },
};

export default resolvers;
