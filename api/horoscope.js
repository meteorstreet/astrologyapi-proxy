export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body;

  const USER_ID = '642649';
  const API_KEY = '35a87c1639018688259ab61406a7e38207ed2985';
  const encoded = Buffer.from(`${USER_ID}:${API_KEY}`).toString('base64');

  try {
    const response = await fetch('https://json.astrologyapi.com/v1/western_horoscope', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
