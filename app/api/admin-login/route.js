import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.EDIT_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const store = await cookies();
  store.set('csirt_admin_token', expected, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 8,
    path: '/',
    sameSite: 'lax',
  });

  return NextResponse.json({ ok: true });
}
