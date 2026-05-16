# SWR FC — Shoreham-Wading River Football Club Website

A static website for **Shoreham-Wading River FC**, designed to be hosted on GoDaddy
(or any standard Linux/Apache shared host) and served from `swrfc.com`.

---

## File structure

```
DaniWebsite/
├── index.html             Homepage
├── about.html             About / club story
├── programs.html          Travel + Developmental program details
├── tryouts.html           2025–26 tryout schedule
├── contact.html           Contact form + map
├── 404.html               Custom error page
├── css/styles.css         Stylesheet (palette, layout, components)
├── js/main.js             Mobile menu + form behavior
├── images/                All site images
│   └── swrfclogo.png      Team crest (also used as favicon)
├── .htaccess              Apache config (clean URLs, HTTPS, caching)
├── robots.txt             SEO
├── sitemap.xml            SEO sitemap
└── README.md              This file
```

To add new photos, simply drop them into `images/` and reference them in HTML as
`<img src="images/your-file.jpg" alt="…">`.

---

## Local preview

The site is plain HTML/CSS/JS — no build step. From this folder, run any static
server:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` to open it in a browser (some features like the
map iframe work better when served, not opened as a file).

---

## Deploying to GoDaddy (cPanel / Shared Hosting)

GoDaddy "Web Hosting" plans use cPanel and Apache. Deploy this site over your
existing GoDaddy Website Builder site by following these steps:

### 1. Move from Website Builder → Web Hosting (if needed)

If your `swrfc.com` is currently on **GoDaddy Website Builder** (which is what
the old site uses), you'll need a **Web Hosting** (cPanel) or **Linux Hosting**
plan to upload custom HTML. To check / upgrade:

1. Log into <https://account.godaddy.com>.
2. Open **My Products** → look for **Web Hosting** or **Linux Hosting**.
3. If you only have **Websites + Marketing / Website Builder**, you'll need to
   add a Web Hosting plan (or use the Builder's HTML import if your plan
   supports it). Web Hosting is the most flexible.

### 2. Upload the files

Once you have cPanel access:

1. In cPanel, open **File Manager** and navigate to `public_html/` (this is the
   web root for the primary domain `swrfc.com`).
2. **Delete or back up** any existing default files inside `public_html/`
   (often `index.html`, `default.html`, `cgi-bin/`, etc.).
3. Select all files inside this `DaniWebsite/` folder and **upload them into
   `public_html/`** so that `index.html` lives at `public_html/index.html`.
   Folder structure should look like:
   ```
   public_html/
   ├── index.html
   ├── about.html
   ├── programs.html
   ├── tryouts.html
   ├── contact.html
   ├── 404.html
   ├── .htaccess
   ├── robots.txt
   ├── sitemap.xml
   ├── css/styles.css
   ├── js/main.js
   └── images/swrfclogo.png
   ```
4. **Make sure `.htaccess` was uploaded.** It's a hidden file; in File Manager,
   click *Settings* → check *Show Hidden Files*.

### 3. Point the domain

If the domain `swrfc.com` is registered with GoDaddy and your hosting is also
GoDaddy, it should already point to the right server. Visit `https://swrfc.com`
to verify.

If you used a different host: log into GoDaddy → **My Products** → **Domains**
→ **DNS** → edit the `A` record for `@` to your host's IP, and the `CNAME` for
`www` to `@` (or your host's domain).

### 4. Enable HTTPS (free with GoDaddy)

1. In cPanel, look for **SSL/TLS Status** or **SSL/TLS** → install the included
   SSL certificate for `swrfc.com` (most GoDaddy plans bundle one).
2. Once active, open `.htaccess` and **uncomment the "Force HTTPS" block** to
   redirect all traffic to `https://`.

### 5. (Optional) Force www or non-www

In `.htaccess`, uncomment the appropriate block to standardize on either
`swrfc.com` or `www.swrfc.com` (recommended for SEO consistency).

### 6. Final checks

- [ ] Open `https://swrfc.com/` — homepage loads.
- [ ] Click through nav: About, Programs, Tryouts, Contact.
- [ ] Try `https://swrfc.com/about` (no `.html`) — should work thanks to the
      rewrite rules in `.htaccess`.
- [ ] Test the contact form: it opens the visitor's email client and pre-fills
      the message to `info@swrfc.com`. (For server-side form processing, you'd
      need a form handler — see "Optional upgrades" below.)
- [ ] Test on mobile — the hamburger menu should slide open and close.

---

## Editing content

All text/content is in plain HTML — open any `.html` file in a text editor and
edit the text directly. Common edits:

- **Update tryout dates** → edit `tryouts.html` (search for "5/27" or "6/4").
- **Update a program** → edit `programs.html`.
- **Change phone number / address** → these appear in the footer of each HTML
  file and in the tryouts info banner. Search for `631-566-6146` and replace.
- **Add a new photo** → drop the file in `images/` and add an `<img>` tag.

---

## Optional upgrades

- **Working contact form**: the form on `contact.html` currently opens the
  user's email client (`mailto:`). To capture submissions server-side, use a
  third-party endpoint such as Formspree, Getform, Web3Forms, or GoDaddy's own
  built-in contact widget, and replace the form's `action` attribute with the
  endpoint URL.
- **Analytics**: drop your Google Analytics or Plausible snippet into the
  `<head>` of each page.
- **CMS**: if the club wants non-technical editors, consider moving to a
  static-site CMS like Decap (Netlify CMS) or porting to WordPress on the same
  GoDaddy hosting.

---

## Brand

- **Navy**: `#1d3a8a`
- **Gold**: `#f4b41a`
- **Fonts**: Montserrat (display) + Inter (body), loaded from Google Fonts.
- **Crest**: `images/swrfclogo.png`.
