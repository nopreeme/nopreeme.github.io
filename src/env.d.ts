
import { defineEnv, envField } from "astro:env/config";
import type { Session } from '@supabase/supabase-js';

declare namespace App {
  interface Locals {
    session: Session | null;
  }
}

export default defineEnv({
  server: {},
  client: {
    PUBLIC_SUPABASE_URL: envField.string({
      context: "client",
      access: "public",
      min: 1,
    }),
    PUBLIC_SUPABASE_ANON_KEY: envField.string({
      context: "client",
      access: "public",
      min: 1,
    }),
  },
});
