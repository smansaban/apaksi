# Vercel + Next.js + Google Apps Script (real-time)

## Jalankan lokal
1) salin `.env.example` -> `.env.local` dan isi `GAS_ENDPOINT`
2) npm i
3) npm run dev

## Produksi (Vercel)
- Hubungkan repo ke Vercel (Add New → Project).
- Set Environment Variable: `GAS_ENDPOINT` = URL GAS Web App kamu.
- Automatic Deployments: ON. Production Branch: main (atau sesuai).
- Halaman akan selalu fetch data terbaru (SSR no-store).

## Ganti URL GAS ke depannya
- Cukup ubah nilai `GAS_ENDPOINT` di Vercel → Settings → Environment Variables → Redeploy.
