import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const startedAt = Date.now();
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`,
      {
        next: { revalidate: 60 },
        signal: controller.signal,
        headers: {
          'User-Agent': 'SevaLinkHomeCare/1.0',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.log('[reverse-geocode] upstream error', {
        status: response.status,
        durationMs: Date.now() - startedAt,
      });

      return NextResponse.json(
        { error: 'Unable to fetch location details' },
        { status: response.status },
      );
    }

    const data = await response.json();

    console.log('[reverse-geocode] success', {
      lat,
      lng,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({
      city:
        data?.address?.city ??
        data?.address?.town ??
        data?.address?.village ??
        data?.address?.state_district ??
        data?.address?.county ??
        '',
      raw: data,
    });
  } catch (error) {
    console.log('[reverse-geocode] failed', {
      lat,
      lng,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: 'Reverse geocoding failed' },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}