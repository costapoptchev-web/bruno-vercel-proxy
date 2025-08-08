// api/proxy.js
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Use POST' });
    }

    const url = process.env.MAKE_WEBHOOK_URL;
    if (!url) {
      return res.status(500).json({ error: 'Missing MAKE_WEBHOOK_URL' });
    }

    const payload = req.body || {};
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await r.text();
    return res.status(200).json({
      status: 'sent',
      make_status: r.status,
      make_response: text
    });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
