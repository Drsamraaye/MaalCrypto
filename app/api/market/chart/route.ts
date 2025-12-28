import { NextRequest, NextResponse } from 'next/server';
import { getCoinChartData } from '@/lib/coingecko';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const coinId = searchParams.get('id');
    const days = searchParams.get('days') || '7';

    if (!coinId) {
        return NextResponse.json({ error: 'Coin ID required' }, { status: 400 });
    }

    const data = await getCoinChartData(coinId, days);
    return NextResponse.json(data);
}
