// /api/checkPulse.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { lastPulse } = require('./sendPulse'); // Dynamiczne wczytanie za każdym razem

    if (lastPulse) {
      res.status(200).json({
        found: true,
        pulse: lastPulse
      });
    } else {
      res.status(200).json({ found: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
