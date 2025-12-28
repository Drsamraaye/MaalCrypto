import { NextResponse } from 'next/server';
import { getBinancePrices, getBinancePrice } from '@/lib/binance';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    try {
        if (symbol) {
            // Single coin price
            const price = await getBinancePrice(symbol.toUpperCase());
            if (!price) {
                return NextResponse.json(
                    { error: 'Coin not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(price);
        }

        // All supported coins
        const prices = await getBinancePrices();
        return NextResponse.json(prices);
    } catch (error) {
        console.error('Prices API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch prices' },
            { status: 500 }
        );
    }
}
