export default function handler(req, res) {
  if (req.method === 'GET') {
    const sendPulse = require('./sendPulse');
    const { pulseQueue } = sendPulse;

    if (pulseQueue.length > 0) {
      const now = new Date();

      // Szukamy pierwszego ważnego pulsa
      const index = pulseQueue.findIndex(pulse => new Date(pulse.valid_until) > now);

      if (index !== -1) {
        const pulseToReturn = pulseQueue.splice(index, 1)[0]; // Usuwamy

        const echoMessage = `ECHO: ${pulseToReturn.pulse_text}`;

        res.setHeader('Content-Type', 'text/plain');
        return res.status(200).send(echoMessage);
      } else {
        // Wszystkie pulsy wygasły → czyścimy
        pulseQueue.length = 0;
        return res.status(204).send(); // No Content
      }
    } else {
      return res.status(204).send(); // No Content
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
