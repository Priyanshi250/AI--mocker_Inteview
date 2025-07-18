import { db } from '@/utils/db';
import { MockInterview, UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mockId = searchParams.get('mockId');
  if (!mockId) {
    return new Response(JSON.stringify({ error: 'mockId is required' }), { status: 400 });
  }
  try {
    const resultArr = await db.select().from(MockInterview).where(eq(MockInterview.mockId, mockId));
    const result = resultArr[0];
    if (!result) {
      return new Response(JSON.stringify({ error: 'Interview not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error('Database error in get-mock-interview:', err);
    return new Response(JSON.stringify({ error: 'Database error', details: String(err) }), { status: 500 });
  }
}

// Add POST endpoint to save user answers
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error('Invalid JSON in request body:', e);
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body', details: String(e) }), { status: 400 });
  }
  const { mockIdRef, question, correctAns, userAns, feedback, rating, userEmail } = body || {};
  console.log('POST /api/get-mock-interview payload:', body);
  if (!mockIdRef || !question || !userAns || !userEmail) {
    console.error('Missing required fields:', { mockIdRef, question, userAns, userEmail });
    return new Response(JSON.stringify({ error: 'Missing required fields', details: { mockIdRef, question, userAns, userEmail } }), { status: 400 });
  }
  try {
    const createdAt = new Date().toISOString();
    const result = await db.insert(UserAnswer).values({
      mockIdRef,
      question,
      correctAns: correctAns || '',
      userAns,
      feedback: feedback || '',
      rating: rating || '',
      userEmail,
      createdAt,
    });
    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (err) {
    console.error('Database error in POST /api/get-mock-interview:', err);
    return new Response(JSON.stringify({ error: 'Database error', details: String(err) }), { status: 500 });
  }
} 