export async function OPTIONS() {
  // CORS preflight support
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error('Invalid JSON in request body');
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { role, description, experience } = body || {};
  console.log('Received POST to /api/gemini-interview', { role, description, experience });

  if (!role || !description || !experience) {
    return new Response(JSON.stringify({ error: 'Missing required fields: role, description, experience' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5;
  if (!apiKey) {
    console.error('Gemini API key not set.');
    return new Response(JSON.stringify({ error: 'Gemini API key not set.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const prompt = `Job position: ${role}, Job Description: ${description}, Years of experience: ${experience}. Give me ${questionCount} interview questions and answers related to the job description and role as a JSON array of objects with 'question' and 'answer' fields. Only return the JSON array.`;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    console.log('Gemini API raw response:', geminiData);

    let questions = [];
    try {
      let text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      text = text.replace(/```json|```/g, '').trim();
      questions = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e);
      questions = [];
    }

    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Failed to fetch from Gemini API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch from Gemini API.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
} 