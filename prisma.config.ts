import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// dotenv/config czyta tylko .env, a Next.js trzyma sekrety w .env.local
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DIRECT_URL"),
  },
});
