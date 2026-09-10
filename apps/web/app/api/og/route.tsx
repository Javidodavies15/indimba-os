import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Indimba';
  const category = searchParams.get('category') ?? '';
  const imageUrl = searchParams.get('image');

  return new ImageResponse(
    (
      <div style={{
        height: '100%', width: '100%', display: 'flex',
        flexDirection: 'column', backgroundColor: '#0D0D0D',
        position: 'relative',
      }}>
        {imageUrl && (
          <img src={imageUrl} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.4,
          }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #050505 20%, transparent 80%)',
        }} />
        <div style={{
          position: 'relative', padding: '60px', display: 'flex',
          flexDirection: 'column', justifyContent: 'flex-end', height: '100%',
        }}>
          <div style={{
            fontSize: 24, fontWeight: 700, color: '#FFD700',
            letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16,
          }}>
            {category} · INDIMBA
          </div>
          <div style={{
            fontSize: 56, fontWeight: 900, color: 'white',
            lineHeight: 1.1, maxWidth: 900,
          }}>
            {title}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
