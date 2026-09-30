const TO = process.env.IDEA_TO || 'samleemac@outlook.com';
// Resend only delivers from onboarding@resend.dev to the account's own address.
// Once a domain is verified in Resend, set IDEA_FROM to an address on it.
const FROM = process.env.IDEA_FROM || 'Sam MacKinley site <onboarding@resend.dev>';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Vercel rejects function requests over 4.5 MB before they reach this code.
const MAX_FILES = 5;
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = /\.(png|jpe?g|gif|webp|avif|heic|heif|bmp|tiff?|svg|pdf|docx?|txt|rtf|pages|key|pptx?|xlsx?|csv|numbers|zip)$/i;

const reply = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const cleanName = (name: string) =>
  name.replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '_').trim().slice(-120) || 'attachment';

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  let files: File[] = [];
  try {
    if ((request.headers.get('content-type') || '').includes('multipart/form-data')) {
      const form = await request.formData();
      data = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === 'string'));
      files = form.getAll('files').filter((v): v is File => typeof v !== 'string' && v.size > 0);
    } else {
      data = await request.json();
    }
  } catch {
    return reply(400, { ok: false, error: 'bad_request' });
  }

  const idea = String(data.idea ?? '').trim().slice(0, 1000);
  const email = String(data.email ?? '').trim().slice(0, 200);

  // Hidden field that people never see; bots fill it in.
  if (String(data.company ?? '')) return reply(200, { ok: true });

  if (!idea) return reply(422, { ok: false, error: 'missing_idea' });
  if (!EMAIL.test(email)) return reply(422, { ok: false, error: 'bad_email' });
  if (files.length > MAX_FILES) return reply(422, { ok: false, error: 'too_many_files' });
  if (files.reduce((n, f) => n + f.size, 0) > MAX_BYTES) return reply(413, { ok: false, error: 'files_too_large' });
  if (files.some(f => !ALLOWED.test(f.name))) return reply(422, { ok: false, error: 'file_type' });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('idea: RESEND_API_KEY is not set');
    return reply(500, { ok: false, error: 'not_configured' });
  }

  const attachments = await Promise.all(files.map(async f => ({
    filename: cleanName(f.name),
    content: Buffer.from(await f.arrayBuffer()).toString('base64'),
  })));
  const attached = attachments.length ? `\n\nAttached: ${attachments.map(a => a.filename).join(', ')}` : '';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New idea: ${idea.slice(0, 60)}${idea.length > 60 ? '…' : ''}`,
      text: `${idea}${attached}\n\n— ${email}\n\nSent from the idea box on sammackinley.com. Hit reply to answer them.`,
      ...(attachments.length && { attachments }),
    }),
  });

  if (!res.ok) {
    console.error('idea: Resend refused the email', res.status, await res.text());
    return reply(502, { ok: false, error: 'send_failed' });
  }
  return reply(200, { ok: true });
}
