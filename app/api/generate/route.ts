import { NextResponse } from 'next/server';
import { greetingInputSchema } from '@/app/lib/schemas';
import { generateGreeting } from '@/app/lib/generateGreeting';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = greetingInputSchema.parse(body);

    const k = (process.env.OPENAI_API_KEY || "").trim();
    console.log("SERVER KEY len:", k.length, "last4:", k.slice(-4));

    const result = await generateGreeting(input);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Generate error:', err);

    const status = err?.status || err?.response?.status || 400;
    const message = err?.error?.message || err?.message || 'Unknown error';

    return NextResponse.json(
      {
        error: message,
        status,
        type: err?.error?.type,
        param: err?.error?.param,
        code: err?.error?.code,
      },
      { status }
    );
  }
}
