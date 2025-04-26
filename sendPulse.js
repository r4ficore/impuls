// /api/sendPulse.js

let lastPulse = null;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { recipient_id, pulse_text, pulse_type, valid_until } = req.body;

    if (!recipient_id || !pulse_text || !pulse_type || !valid_until) {
      return res.status(400).json({ error: "Missing pulse fields" });
    }

    lastPulse = {
      recipient_id,
      pulse_text,
      pulse_type,
      valid_until
    };

    res.status(200).json({ message: "Pulse saved successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export { lastPulse };
