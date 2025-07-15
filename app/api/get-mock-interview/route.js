import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
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