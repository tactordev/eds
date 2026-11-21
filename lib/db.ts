import * as dotenv from "dotenv";
dotenv.config();

import { drizzle } from "drizzle-orm/neon-http";

const connection = process.env.DATABASE_URL;
if (!connection) {
    throw new Error("DATABASE_URL not defined within the environment variables.");
}

export const db = drizzle(connection);
