import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER, 
    password: process.env.POSTGRES_PASSWORD,
    entities: ["entities/*.ts"]
});