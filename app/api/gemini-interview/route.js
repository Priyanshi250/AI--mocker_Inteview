export async function POST(request) {
  const { role, description, experience } = await request.json();
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const questionCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5;
  if (!apiKey) {
    console.error('Gemini API key not set.');
    return new Response(JSON.stringify({ error: 'Gemini API key not set.' }), { status: 500 });
  }

  // Updated prompt for 5 questions
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
      // Remove code block markers if present
      text = text.replace(/```json|```/g, '').trim();
      questions = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e);
      questions = [];
    }

    return Response.json(questions);
  } catch (error) {
    console.error('Failed to fetch from Gemini API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch from Gemini API.' }), { status: 500 });
  }
} 