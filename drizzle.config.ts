import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,  //The ! indicates that TypeScript should treat it as a non-nullable value, assuming it will always be present
  },
} satisfies Config;

// npx drizzle-kit push:pg
// this command will look at our schema and will make sure that all database is synced up with the schema