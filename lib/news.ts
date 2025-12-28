const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;
const NEWS_API_TOKEN = process.env.NEXT_PUBLIC_NEWS_API_TOKEN;

export interface NewsItem {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    source_id: string;
    source_name?: string;
    image_url?: string;
    category?: string[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    results: NewsItem[];
}

// Cache for news data (15 minutes)
let newsCache: { data: NewsItem[]; timestamp: number } | null = null;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

export async function getCryptoNews(limit: number = 10): Promise<NewsItem[]> {
    // Check cache first
    if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
        return newsCache.data.slice(0, limit);
    }

    if (!NEWS_API_URL || !NEWS_API_TOKEN || NEWS_API_TOKEN === 'your_newsdata_api_key_here') {
        console.warn('NewsDataHub API not configured. Using fallback news.');
        return getFallbackNews().slice(0, limit);
    }

    try {
        const res = await fetch(
            `${NEWS_API_URL}?language=en&topic=cryptocurrency&size=20`,
            {
                headers: { 'x-api-key': NEWS_API_TOKEN },
                next: { revalidate: 900 } // 15 min server cache
            }
        );

        if (!res.ok) {
            console.error('NewsDataHub API Error:', res.statusText);
            return getFallbackNews().slice(0, limit);
        }

        const data: NewsResponse = await res.json();

        // Update cache
        newsCache = {
            data: data.results || [],
            timestamp: Date.now()
        };

        return newsCache.data.slice(0, limit);
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return getFallbackNews().slice(0, limit);
    }
}

// Fallback news when API is not configured
function getFallbackNews(): NewsItem[] {
    return [
        {
            title: "Bitcoin Surges Past Key Resistance Level Amid Institutional Buying",
            description: "Major institutional investors continue to accumulate Bitcoin as the cryptocurrency breaks through significant resistance levels.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
            category: ["cryptocurrency", "bitcoin"]
        },
        {
            title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
            description: "Arbitrum and Optimism lead the charge as Layer 2 networks process billions in transactions.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
            category: ["cryptocurrency", "ethereum"]
        },
        {
            title: "DeFi Total Value Locked Reaches New All-Time High",
            description: "Decentralized finance protocols collectively hold over $100 billion in assets.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
            category: ["cryptocurrency", "defi"]
        },
        {
            title: "Major Banks Announce Cryptocurrency Custody Services",
            description: "Traditional financial institutions expand their crypto offerings to meet client demand.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
            category: ["cryptocurrency", "adoption"]
        },
        {
            title: "NFT Market Shows Signs of Recovery with Blue-Chip Collections",
            description: "Top NFT collections see renewed interest as the market stabilizes.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80",
            category: ["cryptocurrency", "nft"]
        },
        {
            title: "Solana Ecosystem Expands with New Gaming Projects",
            description: "Multiple gaming studios announce launches on the high-performance blockchain.",
            link: "#",
            pubDate: new Date().toISOString(),
            source_id: "crypto-news",
            source_name: "MaalCrypto",
            image_url: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80",
            category: ["cryptocurrency", "solana"]
        }
    ];
}
