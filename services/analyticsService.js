const MEASUREMENT_ID = "G-JC8X366W8J"; // Your Measurement ID
const API_SECRET = "YOUR_API_SECRET"; // Your API Secret

const logEvent = async (eventName, params) => {
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

  const payload = {
    client_id: `${Math.random().toString(36).substring(2)}`, // Generate a random client ID
    events: [
      {
        name: eventName,
        params: params,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Failed to log event: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error logging event: ${error}`);
  }
};

export { logEvent };
