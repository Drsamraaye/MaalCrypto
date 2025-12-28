/**
 * Binance API Integration
 * - REST API for initial prices (server-side)
 * - WebSocket URL for client-side live updates
 */

const BINANCE_REST_URL = 'https://api.binance.com/api/v3';
export const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

// Supported trading pairs
export const SUPPORTED_SYMBOLS = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
    'DOGEUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT'
];

export interface BinanceTickerData {
    symbol: string;
    price: string;
    priceChange: string;
    priceChangePercent: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
}

export interface CoinPrice {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    changePercent24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    quoteVolume24h: number;
}

// Map symbols to readable names
export const SYMBOL_NAMES: Record<string, string> = {
    BTCUSDT: 'Bitcoin',
    ETHUSDT: 'Ethereum',
    BNBUSDT: 'BNB',
    SOLUSDT: 'Solana',
    XRPUSDT: 'XRP',
    DOGEUSDT: 'Dogecoin',
    ADAUSDT: 'Cardano',
    AVAXUSDT: 'Avalanche',
    DOTUSDT: 'Polkadot',
    LINKUSDT: 'Chainlink',
};

/**
 * Fetch 24hr ticker data from Binance REST API
 * Server-side only - with caching
 */
export async function getBinancePrices(): Promise<CoinPrice[]> {
    try {
        const symbols = SUPPORTED_SYMBOLS.join(',');
        const response = await fetch(
            `${BINANCE_REST_URL}/ticker/24hr?symbols=${encodeURIComponent(`["${SUPPORTED_SYMBOLS.join('","')}"]`)}`,
            { next: { revalidate: 60 } } // Cache for 60 seconds
        );

        if (!response.ok) {
            console.error('Binance API error:', response.statusText);
            return [];
        }

        const data: BinanceTickerData[] = await response.json();

        return data.map(ticker => ({
            symbol: ticker.symbol,
            name: SYMBOL_NAMES[ticker.symbol] || ticker.symbol.replace('USDT', ''),
            price: parseFloat(ticker.price),
            change24h: parseFloat(ticker.priceChange),
            changePercent24h: parseFloat(ticker.priceChangePercent),
            high24h: parseFloat(ticker.highPrice),
            low24h: parseFloat(ticker.lowPrice),
            volume24h: parseFloat(ticker.volume),
            quoteVolume24h: parseFloat(ticker.quoteVolume),
        }));
    } catch (error) {
        console.error('Failed to fetch Binance prices:', error);
        return [];
    }
}

/**
 * Fetch single coin price
 */
export async function getBinancePrice(symbol: string): Promise<CoinPrice | null> {
    try {
        const response = await fetch(
            `${BINANCE_REST_URL}/ticker/24hr?symbol=${symbol}`,
            { next: { revalidate: 30 } }
        );

        if (!response.ok) return null;

        const data: BinanceTickerData = await response.json();

        return {
            symbol: data.symbol,
            name: SYMBOL_NAMES[data.symbol] || data.symbol.replace('USDT', ''),
            price: parseFloat(data.price),
            change24h: parseFloat(data.priceChange),
            changePercent24h: parseFloat(data.priceChangePercent),
            high24h: parseFloat(data.highPrice),
            low24h: parseFloat(data.lowPrice),
            volume24h: parseFloat(data.volume),
            quoteVolume24h: parseFloat(data.quoteVolume),
        };
    } catch (error) {
        console.error('Failed to fetch price for', symbol, error);
        return null;
    }
}
