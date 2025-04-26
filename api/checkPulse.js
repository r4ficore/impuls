export default function handler(req, res) {
  if (req.method === 'GET') {
    const sendPulse = require('./sendPulse');
    const { lastPulse } = sendPulse;

    if (lastPulse) {
      const now = new Date();
      const validUntil = new Date(lastPulse.valid_until);

      if (validUntil > now) {
        // Puls jest nadal ważny → zwracamy i od razu kasujemy
        const pulseToReturn = { ...lastPulse }; // Kopiujemy zanim usuniemy

        sendPulse.lastPulse = null; // Kasujemy po pobraniu

        return res.status(200).json({
          found: true,
          pulse: pulseToReturn
        });
      } else {
        // Puls wygasł → czyścimy
        sendPulse.lastPulse = null;
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
