export default async function handler(req, res) {
  try {
    const MAKE_WEBHOOK = "https://hook.eu2.make.com/ovbx9kinytetkopoj53d7be7n7m8wp3a";

    // Read JSON body (Node on Vercel parses it if header is correct)
    const data = req.body || {};

    const r = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await r.text();

    return res.status(200).json({
      status: "✅ Forwarded to Make",
      make_status: r.status,
      make_response: text
    });
  } catch (e) {
    return res.status(500).json({ status: "❌ Failed", error: String(e) });
  }
}
