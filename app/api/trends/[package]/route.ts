import { NextResponse } from 'next/server';
import { getDownloadsTrend } from '@/lib/data-sources/npm';

export const revalidate = 3600;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ package: string }> }
) {
  const { package: packageName } = await params;

  if (!packageName) {
    return NextResponse.json(
      { error: 'Package name is required' },
      { status: 400 }
    );
  }

  try {
    const trend = await getDownloadsTrend(decodeURIComponent(packageName));
    return NextResponse.json({ package: packageName, trend });
  } catch (error) {
    console.error(`Error fetching trend for ${packageName}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch trend data' },
      { status: 500 }
    );
  }
}
