import { NextResponse } from 'next/server';
import { getHistoricalDaily, getHistoricalHourly } from '@/lib/cryptocompare';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol')?.toUpperCase() || 'BTC';
    const currency = searchParams.get('currency')?.toUpperCase() || 'USD';
    const timeframe = searchParams.get('timeframe') || 'daily';
    const limit = parseInt(searchParams.get('limit') || '30');

    try {
        let chartData;

        if (timeframe === 'hourly' || timeframe === '24h') {
            chartData = await getHistoricalHourly(symbol, currency, limit);
        } else {
            chartData = await getHistoricalDaily(symbol, currency, limit);
        }

        if (!chartData) {
            return NextResponse.json(
                { error: 'Failed to fetch chart data' },
                { status: 500 }
            );
        }

        // Format for frontend charting
        const formattedData = chartData.data.map(point => ({
            timestamp: point.time * 1000, // Convert to milliseconds
            date: new Date(point.time * 1000).toISOString(),
            open: point.open,
            high: point.high,
            low: point.low,
            close: point.close,
            volume: point.volumeto
        }));

        return NextResponse.json({
            success: true,
            symbol: chartData.symbol,
            currency: chartData.currency,
            timeframe,
            data: formattedData
        });
    } catch (error) {
        console.error('Charts API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch chart data' },
            { status: 500 }
        );
    }
}
