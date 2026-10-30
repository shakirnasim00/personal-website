# personal-website

Shakir Nasim's personal website at [shakirnasim.com](https://shakirnasim.com).

Plain HTML, CSS and JS. There's no build step and nothing to install.

```
index.html    page content (look for TODO comments)
styles.css    design tokens (colors, fonts) at the top, light + dark themes
script.js     theme toggle, local clock, scroll reveals
404.html      not-found page
CNAME         custom domain for GitHub Pages
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Hosting: GitHub Pages + Hostinger DNS

1. **GitHub → Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`.
2. **Hostinger → Domains → shakirnasim.com → DNS / Nameservers**. Keep Hostinger's nameservers, delete any existing `A`/`CNAME` records for `@` and `www`, then add:

   | Type  | Name | Value                  |
   |-------|------|------------------------|
   | A     | @    | 185.199.108.153        |
   | A     | @    | 185.199.109.153        |
   | A     | @    | 185.199.110.153        |
   | A     | @    | 185.199.111.153        |
   | CNAME | www  | shakirnasim00.github.io |

3. Back in **Settings → Pages**, confirm the custom domain reads `shakirnasim.com`. Once the DNS check passes (from a few minutes up to 24 hours), tick **Enforce HTTPS**.

After that, every push to `main` goes live automatically.
