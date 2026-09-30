const TO = process.env.IDEA_TO || 'samleemac@outlook.com';
// Resend only delivers from onboarding@resend.dev to the account's own address.
// Once a domain is verified in Resend, set IDEA_FROM to an address on it.
const FROM = process.env.IDEA_FROM || 'Sam MacKinley site <onboarding@resend.dev>';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const reply = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return reply(400, { ok: false, error: 'bad_request' });
  }

  const idea = String(data.idea ?? '').trim().slice(0, 1000);
  const email = String(data.email ?? '').trim().slice(0, 200);

  // Hidden field that people never see; bots fill it in.
  if (String(data.company ?? '')) return reply(200, { ok: true });

  if (!idea) return reply(422, { ok: false, error: 'missing_idea' });
  if (!EMAIL.test(email)) return reply(422, { ok: false, error: 'bad_email' });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('idea: RESEND_API_KEY is not set');
    return reply(500, { ok: false, error: 'not_configured' });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New idea: ${idea.slice(0, 60)}${idea.length > 60 ? '…' : ''}`,
      text: `${idea}\n\n— ${email}\n\nSent from the idea box on sammackinley.com. Hit reply to answer them.`,
    }),
  });

  if (!res.ok) {
    console.error('idea: Resend refused the email', res.status, await res.text());
    return reply(502, { ok: false, error: 'send_failed' });
  }
  return reply(200, { ok: true });
}
