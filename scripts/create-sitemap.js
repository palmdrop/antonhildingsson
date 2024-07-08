import { createSitemap } from 'svelte-sitemap/src/index.js';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

createSitemap(
  process.env.VITE_BASE_URL, 
  { debug: true }
);