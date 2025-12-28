/**
 * CryptoPanic API Integration
 * Crypto news aggregation
 * Server-side only (API key protected)
 * 
 * API v2 requires plan in URL: developer, growth, or enterprise
 */

// Using DEVELOPER plan endpoint
const CRYPTOPANIC_URL = 'https://cryptopanic.com/api/developer/v2';
const API_KEY = process.env.CRYPTOPANIC_API_KEY;

export interface CryptoPanicPost {
    id: number;
    kind: 'news' | 'media';
    domain: string;
    title: string;
    published_at: string;
    slug: string;
    url: string;
    source: {
        title: string;
        region: string;
        domain: string;
    };
    currencies?: Array<{
        code: string;
        title: string;
        slug: string;
    }>;
    votes: {
        negative: number;
        positive: number;
        important: number;
        liked: number;
        disliked: number;
        lol: number;
        toxic: number;
        saved: number;
    };
}

export interface CryptoPanicResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CryptoPanicPost[];
}

export interface NewsArticle {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt: string;
    currencies: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
    votes: {
        positive: number;
        negative: number;
    };
}

/**
 * Fallback sample news when API fails
 */
const FALLBACK_NEWS: NewsArticle[] = [
    {
        id: '1',
        title: 'Bitcoin Reaches New Milestone as Institutional Interest Grows',
        url: 'https://example.com/news/1',
        source: 'CryptoNews',
        publishedAt: new Date().toISOString(),
        currencies: ['BTC'],
        sentiment: 'positive',
        votes: { positive: 120, negative: 10 }
    },
    {
        id: '2',
        title: 'Ethereum Layer 2 Solutions See Record Transaction Volume',
        url: 'https://example.com/news/2',
        source: 'BlockchainDaily',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        currencies: ['ETH'],
        sentiment: 'positive',
        votes: { positive: 85, negative: 5 }
    },
    {
        id: '3',
        title: 'Solana Network Upgrade Improves Transaction Speed',
        url: 'https://example.com/news/3',
        source: 'CryptoInsider',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        currencies: ['SOL'],
        sentiment: 'positive',
        votes: { positive: 65, negative: 8 }
    },
    {
        id: '4',
        title: 'DeFi Protocol Launches New Yield Farming Opportunities',
        url: 'https://example.com/news/4',
        source: 'DeFiPulse',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        currencies: ['ETH', 'AAVE'],
        sentiment: 'neutral',
        votes: { positive: 45, negative: 15 }
    },
    {
        id: '5',
        title: 'Cryptocurrency Regulations Expected in Major Markets',
        url: 'https://example.com/news/5',
        source: 'MarketWatch',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        currencies: ['BTC', 'ETH'],
        sentiment: 'neutral',
        votes: { positive: 30, negative: 25 }
    }
];

/**
 * Fetch latest crypto news from CryptoPanic
 */
export async function getCryptoPanicNews(
    filter: 'rising' | 'hot' | 'bullish' | 'bearish' | 'important' | 'lol' | 'all' = 'hot',
    currencies?: string[],
    limit: number = 20
): Promise<NewsArticle[]> {
    if (!API_KEY) {
        console.warn('CryptoPanic API key not configured, using fallback data');
        return FALLBACK_NEWS.slice(0, limit);
    }

    try {
        // CryptoPanic API v2 DEVELOPER endpoint
        let url = `${CRYPTOPANIC_URL}/posts/?auth_token=${API_KEY}&filter=${filter}&public=true`;

        if (currencies && currencies.length > 0) {
            url += `&currencies=${currencies.join(',')}`;
        }

        console.log('Fetching CryptoPanic news...');

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`CryptoPanic API error: ${response.status} ${response.statusText}`);
            // Return fallback data on API error
            return FALLBACK_NEWS.slice(0, limit);
        }

        const data: CryptoPanicResponse = await response.json();

        if (!data.results || data.results.length === 0) {
            console.warn('CryptoPanic returned no results, using fallback');
            return FALLBACK_NEWS.slice(0, limit);
        }

        return data.results
            .filter(post => post && post.title) // Filter out invalid posts
            .slice(0, limit)
            .map(post => ({
                id: post.id?.toString() || Math.random().toString(),
                title: post.title || 'Untitled',
                url: post.url || '#',
                source: post.source?.title || post.domain || 'Unknown Source',
                publishedAt: post.published_at || new Date().toISOString(),
                currencies: post.currencies?.map(c => c.code) || [],
                sentiment: post.votes ? determineSentiment(post.votes) : 'neutral',
                votes: {
                    positive: (post.votes?.positive || 0) + (post.votes?.liked || 0),
                    negative: (post.votes?.negative || 0) + (post.votes?.disliked || 0),
                }
            }));
    } catch (error) {
        console.error('Failed to fetch CryptoPanic news:', error);
        // Return fallback data on error
        return FALLBACK_NEWS.slice(0, limit);
    }
}

/**
 * Determine sentiment from votes
 */
function determineSentiment(votes: CryptoPanicPost['votes']): 'positive' | 'negative' | 'neutral' {
    const positive = votes.positive + votes.liked;
    const negative = votes.negative + votes.disliked + votes.toxic;

    if (positive > negative * 2) return 'positive';
    if (negative > positive * 2) return 'negative';
    return 'neutral';
}

/**
 * Fetch news for specific coins
 */
export async function getCoinNews(
    coinSymbols: string[],
    limit: number = 10
): Promise<NewsArticle[]> {
    return getCryptoPanicNews('hot', coinSymbols, limit);
}

/**
 * Fetch trending/important news
 */
export async function getTrendingNews(limit: number = 10): Promise<NewsArticle[]> {
    return getCryptoPanicNews('important', undefined, limit);
}
