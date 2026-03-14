import { NextRequest, NextResponse } from 'next/server';

const backendApiBase =
  process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email query parameter' }, { status: 400 });
  }

  const targetUrl = `${backendApiBase.replace(/\/$/, '')}/usuarios/email/${encodeURIComponent(email)}`;

  try {
    const backendResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      cache: 'no-store'
    });

    if (backendResponse.status === 404) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          error: 'Backend user request failed',
          status: backendResponse.status
        },
        { status: 502 }
      );
    }

    const user = await backendResponse.json();
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: 'Unable to connect to backend API'
      },
      { status: 502 }
    );
  }
}
