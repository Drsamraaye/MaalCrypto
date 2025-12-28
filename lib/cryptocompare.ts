/**
 * CryptoCompare API Integration
 * Historical price data for charts
 * Server-side only (API key protected)
 */

const CRYPTOCOMPARE_URL = 'https://min-api.cryptocompare.com/data';
const API_KEY = process.env.CRYPTOCOMPARE_API_KEY;

export interface HistoricalDataPoint {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volumefrom: number;
    volumeto: number;
}

export interface ChartData {
    symbol: string;
    currency: string;
    data: HistoricalDataPoint[];
}

/**
 * Get historical daily data for a coin
 */
export async function getHistoricalDaily(
    symbol: string,
    currency: string = 'USD',
    limit: number = 30
): Promise<ChartData | null> {
    if (!API_KEY) {
        console.error('CryptoCompare API key not configured');
        return null;
    }

    try {
        const response = await fetch(
            `${CRYPTOCOMPARE_URL}/v2/histoday?fsym=${symbol}&tsym=${currency}&limit=${limit}`,
            {
                headers: { authorization: `Apikey ${API_KEY}` },
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            console.error('CryptoCompare API error:', response.statusText);
            return null;
        }

        const result = await response.json();

        if (result.Response === 'Error') {
            console.error('CryptoCompare error:', result.Message);
            return null;
        }

        return {
            symbol,
            currency,
            data: result.Data?.Data || []
        };
    } catch (error) {
        console.error('Failed to fetch historical data:', error);
        return null;
    }
}

/**
 * Get historical hourly data for shorter timeframes
 */
export async function getHistoricalHourly(
    symbol: string,
    currency: string = 'USD',
    limit: number = 24
): Promise<ChartData | null> {
    if (!API_KEY) {
        console.error('CryptoCompare API key not configured');
        return null;
    }

    try {
        const response = await fetch(
            `${CRYPTOCOMPARE_URL}/v2/histohour?fsym=${symbol}&tsym=${currency}&limit=${limit}`,
            {
                headers: { authorization: `Apikey ${API_KEY}` },
                next: { revalidate: 60 } // Cache for 1 minute
            }
        );

        if (!response.ok) return null;

        const result = await response.json();

        if (result.Response === 'Error') return null;

        return {
            symbol,
            currency,
            data: result.Data?.Data || []
        };
    } catch (error) {
        console.error('Failed to fetch hourly data:', error);
        return null;
    }
}

/**
 * Get current price from CryptoCompare (fallback)
 */
export async function getCurrentPrice(
    symbols: string[],
    currency: string = 'USD'
): Promise<Record<string, number>> {
    try {
        const response = await fetch(
            `${CRYPTOCOMPARE_URL}/pricemulti?fsyms=${symbols.join(',')}&tsyms=${currency}`,
            {
                headers: API_KEY ? { authorization: `Apikey ${API_KEY}` } : {},
                next: { revalidate: 30 }
            }
        );

        if (!response.ok) return {};

        const data = await response.json();

        const prices: Record<string, number> = {};
        for (const sym of symbols) {
            if (data[sym]?.[currency]) {
                prices[sym] = data[sym][currency];
            }
        }

        return prices;
    } catch (error) {
        console.error('Failed to fetch current prices:', error);
        return {};
    }
}
