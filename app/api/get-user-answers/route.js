import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mockIdRef = searchParams.get('mockIdRef');
  if (!mockIdRef) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const answers = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, mockIdRef));
    return new Response(JSON.stringify(answers), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
} 