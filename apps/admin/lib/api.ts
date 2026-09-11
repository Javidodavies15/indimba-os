const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_API_TOKEN;

function headers(hasBody: boolean) {
  const h: Record<string, string> = {};
  if (hasBody) h['Content-Type'] = 'application/json';
  if (ADMIN_TOKEN) h['x-admin-token'] = ADMIN_TOKEN;
  return h;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...headers(!!init?.body), ...init?.headers },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${init?.method ?? 'GET'} ${path} failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
  del: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
