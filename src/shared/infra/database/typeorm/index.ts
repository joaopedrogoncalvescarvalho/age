import {
  DataSource,
} from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const connection = async (): Promise<DataSource> => {
  const folder = process.env.ENV === 'development' ? 'src' : 'dist';
  const extensions = process.env.ENV === 'development' ? 'ts' : 'js';

  const dataSource = new DataSource({
    type: 'postgres',
    name: 'default',
    url: String(process.env.DATABASE_URL),
    database: String(process.env.PG_DATABASE),
    host: String(process.env.PG_HOST),
    port: Number(process.env.PG_PORT),
    username: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    synchronize: false,
    logging: false,
    entities: [
      `./${folder}/modules/**/infra/database/typeorm/entities/*.${extensions}`,
    ],
    migrations: [
      `./${folder}/shared/infra/database/typeorm/migrations/*.${extensions}`,
    ],
    subscribers: [
      `./${folder}/shared/infra/database/typeorm/subscribers/*.${extensions}`,
    ],
    ssl: String('development') === 'development' ? false : { rejectUnauthorized: false },
  });

  const connect = await dataSource.initialize();

  return connect;
};

connection();
