export const config = {
  runtime: "edge"
};

export default function handler() {
  return new Response(JSON.stringify({ ok: true, runtime: "edge" }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=604800, stale-while-revalidate=86400"
    }
  });
}
