// Jeśli masz Node.js 18+ nie potrzebujesz node-fetch
// Jeśli masz starszą wersję Node.js, odkomentuj i zainstaluj node-fetch:
// import fetch from 'node-fetch'; // npm install node-fetch

const HEARTBEAT_INTERVAL_MS = 5000; // 5 sekund
const SERVER_URL = 'https://prts-impulse-generator-server-tojarafis-projects.vercel.app'; // Twój serwer

async function checkHeartbeat() {
  try {
    const response = await fetch(`${SERVER_URL}/api/heartbeat`);

    if (!response.ok) {
      console.error(`[Heartbeat] Request failed with status: ${response.status}`);
      return;
    }

    const data = await response.json();
    if (data.available) {
      console.log('[Heartbeat] New pulse detected! Fetching pulse...');
      await getPulse();
    } else {
      console.log('[Heartbeat] No new pulses.');
    }
  } catch (error) {
    console.error('[Heartbeat] Error during check:', error.message);
  }
}

async function getPulse() {
  try {
    const response = await fetch(`${SERVER_URL}/api/checkPulse`);

    if (response.status === 200) {
      const pulseText = await response.text(); // UWAGA: odbieramy czysty tekst
      console.log(`[Pulse Received]: ${pulseText}`);
      
      // Opcjonalnie: Możesz tutaj wywołać inną funkcję, przetworzyć puls itd.
      // processPulse(pulseText);

    } else if (response.status === 204) {
      console.log('[CheckPulse] No available pulse to fetch.');
    } else {
      console.error(`[CheckPulse] Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('[CheckPulse] Error fetching pulse:', error.message);
  }
}

// Startowanie agenta
function startHeartbeat() {
  console.log('🔵 Agent Bot started. Listening for pulses...');
  setInterval(checkHeartbeat, HEARTBEAT_INTERVAL_MS);
}

// Uruchom agenta
startHeartbeat();
