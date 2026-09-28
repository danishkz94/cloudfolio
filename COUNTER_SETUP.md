# Live Telemetry setup

This project includes a Cloudflare Pages Function at `GET /api/visitors`.
It increments and returns a single D1-backed visitor count.

## One-time Cloudflare setup

1. In **Workers & Pages**, open **D1 SQL Database** and create a database named `cloudfolio-counter`.
2. Open the database's **Console** and run the contents of `migrations/0001_create_visitor_counter.sql`.
3. Open the `dk-cloudfolio` Pages project, then go to **Settings → Bindings → Add → D1 database**.
4. Set the variable name to `VISITOR_COUNTER`, select `cloudfolio-counter`, and save.
5. Push the function and migration files to `main`. Trigger a redeploy if Cloudflare does not automatically start one.

After deployment, open `https://dk-cloudfolio.pages.dev/api/visitors`. It should return JSON like `{ "count": 1 }`.

The site badge then updates automatically. It uses `Cache-Control: no-store`, so it always receives a fresh count.
