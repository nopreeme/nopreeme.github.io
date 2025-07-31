
import { defineMiddleware } from 'astro:middleware';
import { createSupabaseClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createSupabaseClient(context.cookies);

  const { data: { session } } = await supabase.auth.getSession();

  (context.locals as any).session = session;

  return next();
});
