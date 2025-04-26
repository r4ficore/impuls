let lastPulse = null;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { recipient_id, pulse_text, pulse_type } = req.body;

    if (!recipient_id || !pulse_text || !pulse_type) {
      return res.status(400).json({ error: "Missing required pulse fields" });
    }

    const now = new Date();
    const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24 godziny

    lastPulse = {
      recipient_id,
      pulse_text,
      pulse_type,
      valid_until: validUntil.toISOString()
    };

    return res.status(200).json({
      message: "Pulse saved successfully",
      pulse: lastPulse
    });

  } else if (req.method === 'GET') {
    if (!lastPulse) {
      return res.status(404).json({ error: "No pulse found" });
    }

    const now = new Date();
    const pulseValidUntil = new Date(lastPulse.valid_until);

    if (pulseValidUntil < now) {
      lastPulse = null; // Wygasł — czyścimy
      return res.status(404).json({ error: "Pulse expired" });
    }

    return res.status(200).json({ pulse: lastPulse });

  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

export { lastPulse };
