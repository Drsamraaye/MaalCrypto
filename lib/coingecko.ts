const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    image: string;
    sparkline_in_7d?: { price: number[] };
}

export interface ChartDataPoints {
    prices: [number, number][]; // [timestamp, price]
}

export async function getMarketTickerData(): Promise<CoinData[]> {
    try {
        const res = await fetch(
            `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=true&price_change_percentage=24h`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            console.error("CoinGecko API Error:", res.statusText);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error("Failed to fetch market ticker data:", error);
        return [];
    }
}

export async function getCoinChartData(coinId: string, days: string = '7'): Promise<ChartDataPoints | null> {
    try {
        const res = await fetch(
            `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        return null;
    }
}

// Re-export trending as well
export interface TrendingItem {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
}

export interface TrendingCoin {
    item: TrendingItem;
}

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
    try {
        const res = await fetch(`${BASE_URL}/search/trending`, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.coins || [];
    } catch (error) {
        return [];
    }
}
