export default function handler(req, res) {
  if (req.method === 'GET') {
    const sendPulse = require('./sendPulse');
    const { pulseQueue } = sendPulse;

    const now = new Date();
    const hasValidPulse = pulseQueue.some(pulse => new Date(pulse.valid_until) > now);

    return res.status(200).json({ available: hasValidPulse });
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
