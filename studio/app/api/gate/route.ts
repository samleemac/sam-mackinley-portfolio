const PASSWORD = "Bode";

const ACCESS_COOKIE = "studio_access";
const ACCESS_VALUE = "granted";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function safePath(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

// Relative Location headers throughout: responses travel through the
// sammackinley.com rewrite, so absolute URLs would leak the internal host.
export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const next = safePath(String(form.get("next") ?? "/"));

  if (password !== PASSWORD) {
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/studio/gate?error=1&next=${encodeURIComponent(next)}`,
      },
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: next === "/" ? "/studio" : `/studio${next}`,
      "Set-Cookie": `${ACCESS_COOKIE}=${ACCESS_VALUE}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}
