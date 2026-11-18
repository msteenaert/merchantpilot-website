# MerchantPilot website

Next.js (App Router) + Supabase, hosted on Railway. English pages show US dollars, Dutch pages show euros.

## What is in here
- `app/[locale]/` – pages (`/en`, `/nl`): home and contact
- `lib/content.js` – all page text in English and Dutch
- `lib/site.js` – prices (euro and dollar), WhatsApp link, trust row
- `app/api/contact/route.js` – saves contact requests in Supabase
- `supabase/schema.sql` – the database table

## Setup in 4 steps
1. **Supabase**: create a project, open *SQL editor*, paste `supabase/schema.sql` and run it.
2. **Keys**: in Supabase go to *Project settings → API* and copy the Project URL and the `service_role` key.
3. **Railway**: *New project → Deploy from GitHub repo → merchantpilot-website*. Under *Variables* add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, e.g. `31612345678`)
   - `NEXT_PUBLIC_SITE_URL`
4. **Domain**: in Railway *Settings → Networking → Custom domain*, add `merchantpilot.nl` and follow the DNS instructions.

Never commit real keys. `.env.example` lists the variable names.

## Local development
```
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```
