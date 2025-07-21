export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
    }
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      // Always return a valid JSON structure for the frontend
      return new Response(JSON.stringify({ rating: '', feedback: 'Gemini API key not set on server.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        })
      }
    );
    const geminiData = await geminiResponse.json();
    let text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/```json|```/g, '').trim();
    let json;
    try {
      json = JSON.parse(text);
      // Enforce rating is a number between 0 and 10
      let ratingNum = Number(json.rating);
      if (isNaN(ratingNum) || ratingNum < 0) ratingNum = 0;
      if (ratingNum > 10) ratingNum = 10;
      json.rating = ratingNum.toString();
    } catch (e) {
      // Log the raw Gemini response for debugging
      console.error('Failed to parse Gemini response:', text);
      json = { rating: '0', feedback: 'Could not parse feedback from Gemini.' };
    }
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error', details: String(err) }), { status: 500 });
  }
} 