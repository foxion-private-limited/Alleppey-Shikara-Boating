import { NextResponse } from 'next/server';
import { createAdminSessionToken, setAdminSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'alleppeyvillageshikaraboating@gmail.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'Sijo@Boat';

    if (
      email &&
      email.toLowerCase().trim() === expectedEmail.toLowerCase().trim() &&
      password === expectedPassword
    ) {
      const token = await createAdminSessionToken(expectedEmail);
      await setAdminSessionCookie(token);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
