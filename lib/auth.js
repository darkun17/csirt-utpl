import { cookies } from 'next/headers';

export async function isEditor() {
  const pwd = process.env.EDIT_PASSWORD;
  if (!pwd) return false;
  const store = await cookies();
  return store.get('csirt_admin_token')?.value === pwd;
}
