import { NextResponse } from 'next/server';
import { getMarketTickerData } from '@/lib/coingecko';

export async function GET() {
    const data = await getMarketTickerData();
    return NextResponse.json(data);
}
