import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "notag-test.ccitz88tut9r.ap-northeast-2.rds.amazonaws.com",
  port: 5432,
  username: "yeong0319",
  password: "tkdahr45",
  database: "notag-test",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
