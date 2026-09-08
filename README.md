# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Deploy + domain (8 Sep 2026)

- Hosting: Vercel project `polishedracing` (team petes-projects). `vercel deploy` = preview, `vercel deploy --prod` = production. Public alias: https://polishedracing.vercel.app
- **polishedracing.co.uk is attached to the project but DNS still points at Wix** (nameservers ns4/ns5.wixdns.net, Wix serves a "connect your domain" error). To go live WITHOUT touching email (MX for info@ lives in the current DNS), add these two records in the Wix DNS panel and leave everything else alone:
  - `A     @    76.76.21.21`
  - `CNAME www  cname.vercel-dns.com`
  Then `vercel domains verify polishedracing.co.uk`. Do NOT switch nameservers to Vercel unless the MX records are recreated there first.
- Facts, design system and rules: `PRODUCT.md`, `DESIGN.md`, `CLAUDE.md`. Verification recipe: `docs/verify.md`.
