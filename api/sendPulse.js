let pulseQueue = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { recipient_id, pulse_text, pulse_type } = req.body;

    if (!recipient_id || !pulse_text || !pulse_type) {
      return res.status(400).json({ error: "Missing required pulse fields" });
    }

    const now = new Date();
    const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +24h

    const newPulse = {
      recipient_id,
      pulse_text,
      pulse_type,
      valid_until: validUntil.toISOString()
    };

    pulseQueue.push(newPulse);

    // Utrzymujemy limit 25 impulsów
    if (pulseQueue.length > 25) {
      pulseQueue.shift(); // Usuwamy najstarszy impuls
    }

    return res.status(200).json({
      message: "Pulse queued successfully",
      pulse: newPulse
    });

  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

export { pulseQueue };
