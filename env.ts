import * as dotenv from 'https://deno.land/std@0.167.0/dotenv/mod.ts';

await dotenv.config({
    export: true,
    safe: true,
    example: '.env.example',
    path: '.env',
  });
export const ENV=Deno.env.toObject();