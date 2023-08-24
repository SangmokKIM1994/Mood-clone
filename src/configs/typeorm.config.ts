import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
