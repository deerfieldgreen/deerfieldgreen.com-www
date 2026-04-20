// Cloudflare Pages Function — handles POST /contact.
//
// Reads form data, rejects honeypot/invalid submissions, forwards the
// message via Resend to contact@deerfieldgreen.com, and redirects the
// user to a branded thank-you page.
//
// Runs on the Workers runtime at the edge. No npm deps — fetch, Response,
// FormData are all built in.

interface Env {
  RESEND_API_KEY: string;
}

const FROM_ADDRESS = 'Deerfield Green Website <noreply@deerfieldgreen.com>';
const TO_ADDRESS = 'contact@deerfieldgreen.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function redirect(url: string): Response {
  return new Response(null, { status: 303, headers: { Location: url } });
}

function isJa(lang: unknown): boolean {
  return typeof lang === 'string' && lang === 'ja';
}

function errorUrl(lang: unknown): string {
  return isJa(lang) ? '/ja/contact/?error=1#form' : '/contact/?error=1#form';
}

function thanksUrl(lang: unknown): string {
  return isJa(lang) ? '/ja/contact/thanks/' : '/contact/thanks/';
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect(errorUrl(null));
  }

  // Honeypot: real users leave this empty.
  const hp = form.get('_hp');
  if (typeof hp === 'string' && hp.trim() !== '') {
    return new Response(null, { status: 204 });
  }

  const lang = form.get('_lang');
  const name = (form.get('name') || '').toString().trim();
  const email = (form.get('email') || '').toString().trim();
  const message = (form.get('message') || '').toString().trim();
  const disclaimer = form.get('disclaimer');

  if (!name || !message || !email || !EMAIL_REGEX.test(email) || disclaimer !== 'on') {
    return redirect(errorUrl(lang));
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY missing from Pages env');
    return redirect(errorUrl(lang));
  }

  const submittedAt = new Date().toISOString();
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Language: ${isJa(lang) ? 'ja' : 'en'}`,
    `Submitted: ${submittedAt}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: `[deerfieldgreen.com] New contact form submission from ${name}`,
        text: body,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '<no body>');
      console.error('Resend API failure', resp.status, detail);
      return redirect(errorUrl(lang));
    }
  } catch (err) {
    console.error('Resend fetch threw', err);
    return redirect(errorUrl(lang));
  }

  return redirect(thanksUrl(lang));
};
