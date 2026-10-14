import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const store = await cookies();
  store.delete('csirt_admin_token');
  return NextResponse.redirect(new URL('/', request.url));
}
