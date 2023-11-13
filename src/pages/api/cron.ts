export const prerender = false;

export async function GET() {
  const random = Math.random();
  return new Response(JSON.stringify({ result: random }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
