# Deploying via GitHub + Cloudflare Pages

This is the recommended setup: push code to GitHub, Cloudflare auto-deploys.
Every `git push` triggers a redeploy in ~30 seconds.

## One-time setup (~10 minutes)

### 1. Make sure you have git + a GitHub account

```bash
git --version    # if "command not found", install Xcode Command Line Tools:
xcode-select --install
```

GitHub account: <https://github.com/signup> (free).

### 2. Create an empty repo on GitHub

1. Go to <https://github.com/new>
2. Repository name: `swrfc-website` (or whatever you want)
3. Public or Private — both work with Cloudflare
4. **DO NOT** add a README, .gitignore, or license. We want it empty.
5. Click "Create repository"

GitHub will show you commands. Copy the HTTPS URL — looks like
`https://github.com/<your-username>/swrfc-website.git`.

### 3. Push this folder to GitHub

Open Terminal, then:

```bash
cd "/Users/michaeljiao/Desktop/DaniWebsite"

# Initialize git in this folder
git init
git branch -M main

# Add everything (the .gitignore excludes the zip + .DS_Store automatically)
git add .
git commit -m "Initial SWR FC website"

# Connect to your GitHub repo (use YOUR url here)
git remote add origin https://github.com/<your-username>/swrfc-website.git
git push -u origin main
```

If git asks for a password, GitHub now requires a **Personal Access Token**
instead — generate one at <https://github.com/settings/tokens> (scope: `repo`).
Or install GitHub Desktop and let it handle auth: <https://desktop.github.com>.

### 4. Connect Cloudflare Pages to GitHub

1. <https://dash.cloudflare.com> → **Workers & Pages** → **Create application**
   → **Pages** tab → **Connect to Git**.
2. Click **Connect GitHub** → authorize the Cloudflare Pages app.
   - You can grant access to just the `swrfc-website` repo (recommended) or
     all repos.
3. Pick `swrfc-website` from the list → **Begin setup**.
4. Project name: `swrfc` (controls the temporary URL `swrfc.pages.dev`).
5. **Build settings** — since this is plain HTML, leave everything empty:
   - Framework preset: **None**
   - Build command: *(empty)*
   - Build output directory: `/`
6. Click **Save and Deploy**. First build takes ~30 seconds.
7. Once it says "Success", click the link → site loads at
   `https://swrfc.pages.dev`.

### 5. Connect your real domain (`swrfc.com`)

(The domain transfer to Cloudflare Registrar should be done first — once
swrfc.com is on Cloudflare DNS, this step is a few clicks.)

1. Inside your Pages project → **Custom domains** tab → **Set up a custom
   domain**.
2. Enter `swrfc.com` → Continue → Activate.
3. Cloudflare creates the DNS records automatically (because the domain is on
   their DNS).
4. Repeat for `www.swrfc.com` (Cloudflare auto-redirects www → apex).
5. SSL provisions automatically (~1 minute). Visit `https://swrfc.com` — live.

---

## After setup: editing the site

```bash
cd "/Users/michaeljiao/Desktop/DaniWebsite"

# make some edits with your editor of choice
# (open index.html, change copy, save)

git add .
git commit -m "Update tryout date"
git push
```

Within ~30 seconds, swrfc.com reflects the change. Cloudflare also keeps a
deploy history — every commit gets a preview URL like
`abc1234.swrfc.pages.dev`, so you can compare or roll back if anything
breaks.

---

## Branch previews (optional, but useful)

Push a branch other than `main` and Cloudflare auto-builds a preview URL for
it. Useful for reviewing big changes before they go to swrfc.com:

```bash
git checkout -b homepage-redesign
# make changes
git push -u origin homepage-redesign
# Cloudflare creates: https://homepage-redesign.swrfc.pages.dev
```

Merge to `main` when you're happy → goes live on swrfc.com.

---

## Comparison: direct upload vs. GitHub

| | Direct upload (drag-and-drop) | GitHub (this guide) |
|---|---|---|
| Deploy speed | ~30 sec | ~30 sec |
| Auto on edit | No | Yes |
| History / rollback | Limited | Full git history |
| Multiple people editing | Painful | Easy |
| Setup time | 0 min | ~10 min |
| Preview branches | No | Yes |

Worth the 10 minutes.
