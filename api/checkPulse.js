// /api/checkPulse.js

import { lastPulse } from './sendPulse';

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (lastPulse) {
      res.status(200).json({
        found: true,
        pulse: lastPulse
      });
    } else {
      res.status(200).json({
        found: false
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
