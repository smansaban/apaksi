import { fetchFromGAS } from "../lib/fetchGAS";

export const dynamic = "force-dynamic"; // selalu render terbaru pada setiap request

export default async function Page() {
  const serverTimestamp = new Date().toISOString();

  let payload: Awaited<ReturnType<typeof fetchFromGAS>>;
  try {
    payload = await fetchFromGAS();
  } catch (e: any) {
    return (
      <main style={{ padding: 24, maxWidth: 920, margin: "0 auto" }}>
        <h1>Data dari Google Apps Script</h1>
        <p>Waktu server: <b>{serverTimestamp}</b></p>
        <p style={{ color: "crimson" }}>
          Error: {e?.message ?? "Unknown error"}
        </p>
        <p>Pastikan <code>GAS_ENDPOINT</code> benar dan App Script kamu publik/accessible.</p>
      </main>
    );
  }

  const { data, rawText } = payload;

  return (
    <main style={{ padding: 24, maxWidth: 920, margin: "0 auto" }}>
      <h1>Data dari Google Apps Script</h1>
      <p>Waktu server: <b>{serverTimestamp}</b></p>

      {data ? (
        <>
          <h2>Terbaca sebagai JSON</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#f6f8fa", padding: 16, borderRadius: 12 }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      ) : (
        <>
          <h2>Terbaca sebagai Teks</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#f6f8fa", padding: 16, borderRadius: 12 }}>
            {rawText}
          </pre>
        </>
      )}
    </main>
  );
}
