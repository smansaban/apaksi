export type GASResult = unknown;

/**
 * Server-side fetch ke Google Apps Script Web App.
 * - cache: 'no-store' agar selalu ambil data terbaru (real-time).
 * - otomatis menangani JSON atau teks.
 */
export async function fetchFromGAS() {
  const endpoint = process.env.GAS_ENDPOINT;
  if (!endpoint) throw new Error("GAS_ENDPOINT belum di-set di Environment Variables Vercel.");

  const res = await fetch(endpoint, {
    cache: "no-store",
    headers: { "Accept": "*/*" }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Gagal fetch GAS (${res.status}): ${text.slice(0, 200)}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = (await res.json()) as GASResult;
    return { data, rawText: null as string | null };
  } else {
    const txt = await res.text();
    // Coba parse JSON jika kebetulan isinya JSON string
    try {
      const parsed = JSON.parse(txt);
      return { data: parsed as GASResult, rawText: null };
    } catch {
      return { data: null as GASResult | null, rawText: txt };
    }
  }
}
