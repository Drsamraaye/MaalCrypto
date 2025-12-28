import { NextResponse } from 'next/server';
import { getCryptoPanicNews, getTrendingNews, getCoinNews } from '@/lib/cryptopanic';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') as 'hot' | 'rising' | 'important' | 'bullish' | 'bearish' || 'hot';
    const coins = searchParams.get('coins');
    const limit = parseInt(searchParams.get('limit') || '20');

    try {
        let news;

        if (coins) {
            // News for specific coins
            const coinSymbols = coins.split(',').map(c => c.trim().toUpperCase());
            news = await getCoinNews(coinSymbols, limit);
        } else if (filter === 'important') {
            // Trending/important news
            news = await getTrendingNews(limit);
        } else {
            // General news with filter
            news = await getCryptoPanicNews(filter, undefined, limit);
        }

        return NextResponse.json({
            success: true,
            count: news.length,
            data: news
        });
    } catch (error) {
        console.error('News API error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}
