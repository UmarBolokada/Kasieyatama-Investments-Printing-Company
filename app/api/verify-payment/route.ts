export async function POST(req: Request) {
  const body = (await req.json()) as { transaction_id?: string };
  const { transaction_id } = body || {};

  try {
    // Using fetch to make the GET request
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',
        headers: {
          // The Authorization header is the same
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json', // Added a content-type header for good practice, although not strictly needed for GET
        },
      }
    );

    // Check if the response is successful (status in the 200s)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    if (data.status === "success") {
      // Payment verified ✅
      // Save order to Sanity or your DB
      return new Response(JSON.stringify({ success: true, data: data }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), { status: 500 });
  }
}