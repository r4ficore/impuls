export default function handler(req, res) {
  if (req.method === 'GET') {
    const sendPulse = require('./sendPulse');
    const { pulseQueue } = sendPulse;

    if (pulseQueue.length > 0) {
      const now = new Date();

      // Szukamy pierwszego ważnego pulsa
      const index = pulseQueue.findIndex(pulse => new Date(pulse.valid_until) > now);

      if (index !== -1) {
        const pulseToReturn = pulseQueue.splice(index, 1)[0]; // Usuwamy i zwracamy

        return res.status(200).json({
          found: true,
          pulse: pulseToReturn
        });
      } else {
        // Wszystkie pulsy wygasły → czyścimy kolejkę
        pulseQueue.length = 0;
        return res.status(200).json({ found: false });
      }
    } else {
      return res.status(200).json({ found: false });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
