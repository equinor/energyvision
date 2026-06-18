// web lib actions getAccessToken
// lib/getAccessToken.ts
export async function getAccessToken() {     
  const res = await fetch(process.env.ACTION_FORM_ACCESS_TOKEN_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.ACTION_FORM_CLIENT_ID!,
      client_secret: process.env.ACTION_FORM_CLIENT_SECRET!,
      scope: `openid ${process.env.ACTION_FORM_SCOPE!}/.default`
    }),
  });

  if (!res.ok) throw new Error('Failed to fetch access token');
  const data = await res.json();
  return {
    token: data.access_token as string,
    expires_in: data.expires_in as number
  };
}
  