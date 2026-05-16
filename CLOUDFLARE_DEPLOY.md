# Deploying to Cloudflare Pages

This walks you through getting `swrfc.com` running on Cloudflare Pages (free,
fast, auto-SSL) while keeping GoDaddy as your domain registrar.

Total time: ~15 minutes.

---

## Step 1 — Make a Cloudflare account (free)

1. Go to <https://dash.cloudflare.com/sign-up>.
2. Sign up with an email + password. No credit card required.
3. Verify your email.

---

## Step 2 — Create a Pages project and upload the site

1. From the Cloudflare dashboard, in the left sidebar click
   **Compute (Workers & Pages)** → **Pages**.
2. Click **Create a project** → **Upload assets** (also labeled
   "Direct upload" in some versions).
3. Project name: `swrfc` (this controls the temporary URL,
   `swrfc.pages.dev`).
4. **Drag the entire `DaniWebsite` folder onto the upload area**, or click
   "select from computer" and pick the folder.
   - Make sure hidden files (`_redirects`, `_headers`) are included.
5. Click **Deploy site**.
6. After ~30 seconds the build finishes. Click the link
   (`https://swrfc.pages.dev`) to see the live site.

> Want auto-deploys instead? Push the folder to a GitHub repo and choose
> "Connect to Git" in step 2. Each `git push` then redeploys automatically.

---

## Step 3 — Add `swrfc.com` as a custom domain

You now have the site live at `swrfc.pages.dev`. To point your real domain at
it:

### 3a. Add the site to Cloudflare

1. In the Cloudflare dashboard, click **+ Add a domain** (top right).
2. Enter `swrfc.com` → choose the **Free** plan.
3. Cloudflare shows you two **nameservers** like `ali.ns.cloudflare.com` and
   `bob.ns.cloudflare.com`. Copy both — you'll need them in step 3b.

### 3b. Update nameservers at GoDaddy

1. Open <https://account.godaddy.com/products> → **Domains** → **swrfc.com**
   → **DNS** → **Nameservers** → **Change**.
2. Choose **Enter my own nameservers** and paste the two Cloudflare
   nameservers from step 3a.
3. Save.
4. Back in the Cloudflare tab, click **Continue / Verify nameservers**.
   Cloudflare will check periodically; full propagation can take anywhere
   from a few minutes to a few hours.

> Heads up — once you change nameservers, the OLD GoDaddy Website Builder
> site will stop resolving (because DNS now points to Cloudflare). That's
> expected.

### 3c. Connect the domain to your Pages project

1. In Cloudflare, go back to **Workers & Pages** → click your `swrfc` project
   → **Custom domains** tab → **Set up a custom domain**.
2. Enter `swrfc.com` → Continue → Activate.
3. Repeat for `www.swrfc.com` (Cloudflare will automatically set up a
   redirect to the apex).
4. Cloudflare automatically issues an SSL certificate within ~1 minute.

You're done. `https://swrfc.com` now serves your new site.

---

## Updating the site later

When you change a file in this folder, redeploy in one of two ways:

### Option A — Drag-and-drop (manual)
- Cloudflare dashboard → **Workers & Pages** → `swrfc` → **Create
  deployment** → drag the folder again.

### Option B — GitHub (automatic)
- Push this folder to a GitHub repo
- In Cloudflare Pages settings → **Builds & deployments** → connect Git
- Every `git push` redeploys automatically (~30 seconds)

### Option C — Wrangler CLI (terminal-savvy)
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy /Users/michaeljiao/Desktop/DaniWebsite \
  --project-name=swrfc
```

---

## Useful side benefits you get on Cloudflare

- **Free Web Analytics** — Pages → your project → Analytics. No GA snippet
  needed.
- **Forms** — Cloudflare Pages can handle form submissions natively if you
  upgrade to a paid plan; or use a free third-party (Formspree, Web3Forms).
- **Preview deployments** — every Git branch gets its own URL for testing.
- **DDoS / bot protection** — included automatically on the Free plan.

---

## What to leave behind

After Cloudflare is live, you can:
- **Cancel your GoDaddy Website Builder subscription** (the old site is no
  longer reachable anyway). Domains → Products → Cancel the Website Builder
  plan only — KEEP the domain registration itself.
- Keep `.htaccess` in this folder — it's harmless; Cloudflare just ignores
  it. (`_redirects` and `_headers` are the Cloudflare versions.)
