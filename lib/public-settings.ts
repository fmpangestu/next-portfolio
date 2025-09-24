// lib/public-settings.ts
export async function getSettings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`, { cache: "no-store" });
  const json = await res.json();
  return json.data; // sesuai API kamu
}
