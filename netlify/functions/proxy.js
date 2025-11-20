import fetch from "node-fetch";

export async function handler(event) {
  const path = event.path.replace("/.netlify/functions/proxy", "");
  const query = event.rawQuery ? `?${event.rawQuery}` : "";

  const backendUrl = `http://157.10.161.48/api${path}${query}`;

  try {
    const response = await fetch(backendUrl, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: ["POST", "PUT", "PATCH"].includes(event.httpMethod)
        ? event.body
        : undefined,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
