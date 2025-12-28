'use client';

import { useBinanceTicker, TickerUpdate } from '@/hooks/useBinanceTicker';
import { TrendingUp, TrendingDown, Wifi, WifiOff, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface CoinPrice {
    symbol: string;
    name: string;
    price: number;
    changePercent24h: number;
}

interface LiveTickerProps {
    initialPrices?: CoinPrice[];
}

const SYMBOL_NAMES: Record<string, string> = {
    BTCUSDT: 'BTC',
    ETHUSDT: 'ETH',
    BNBUSDT: 'BNB',
    SOLUSDT: 'SOL',
    XRPUSDT: 'XRP',
    DOGEUSDT: 'DOGE',
    ADAUSDT: 'ADA',
    AVAXUSDT: 'AVAX',
    DOTUSDT: 'DOT',
    LINKUSDT: 'LINK',
};

const SYMBOL_ICONS: Record<string, string> = {
    BTCUSDT: '₿',
    ETHUSDT: 'Ξ',
    BNBUSDT: '◆',
    SOLUSDT: '◎',
    XRPUSDT: '✕',
    DOGEUSDT: 'Ð',
    ADAUSDT: '₳',
    AVAXUSDT: '▲',
    DOTUSDT: '●',
    LINKUSDT: '⬡',
};

function formatPrice(price: number): string {
    if (price >= 1000) {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (price >= 1) {
        return price.toFixed(2);
    } else {
        return price.toFixed(4);
    }
}

export function LiveTicker({ initialPrices = [] }: LiveTickerProps) {
    const { getAllTickers, isConnected, error } = useBinanceTicker();
    const [prices, setPrices] = useState<Map<string, TickerUpdate>>(new Map());
    const [flashStates, setFlashStates] = useState<Map<string, 'up' | 'down' | null>>(new Map());
    const prevPricesRef = useRef<Map<string, number>>(new Map());

    // Initialize with server-side prices
    useEffect(() => {
        if (initialPrices.length > 0) {
            const initialMap = new Map<string, TickerUpdate>();
            initialPrices.forEach(p => {
                initialMap.set(p.symbol, {
                    symbol: p.symbol,
                    price: p.price,
                    priceChange: 0,
                    priceChangePercent: p.changePercent24h,
                    high24h: 0,
                    low24h: 0,
                    volume: 0,
                    lastUpdate: Date.now()
                });
            });
            setPrices(initialMap);
        }
    }, [initialPrices]);

    // Update with WebSocket data and flash prices
    useEffect(() => {
        const tickers = getAllTickers();
        if (tickers.length > 0) {
            const newMap = new Map<string, TickerUpdate>();
            const newFlashStates = new Map<string, 'up' | 'down' | null>();

            tickers.forEach(t => {
                newMap.set(t.symbol, t);

                // Check for price change flash
                const prevPrice = prevPricesRef.current.get(t.symbol);
                if (prevPrice !== undefined && prevPrice !== t.price) {
                    newFlashStates.set(t.symbol, t.price > prevPrice ? 'up' : 'down');

                    // Clear flash after animation
                    setTimeout(() => {
                        setFlashStates(prev => {
                            const updated = new Map(prev);
                            updated.set(t.symbol, null);
                            return updated;
                        });
                    }, 500);
                }

                prevPricesRef.current.set(t.symbol, t.price);
            });

            setPrices(newMap);
            if (newFlashStates.size > 0) {
                setFlashStates(prev => new Map([...prev, ...newFlashStates]));
            }
        }
    }, [getAllTickers]);

    const tickerData = Array.from(prices.values());

    return (
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />

            {/* Connection Status Bar */}
            <div className="relative container mx-auto px-4 py-1.5 flex items-center justify-between text-xs border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    {isConnected ? (
                        <div className="flex items-center gap-2">
                            <span className="live-dot" />
                            <Wifi className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 font-medium">Live Prices</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <WifiOff className="w-3 h-3 text-amber-400" />
                            <span className="text-amber-400 font-medium">Connecting...</span>
                        </div>
                    )}
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Binance WebSocket
                    </span>
                </div>
                {error && <span className="text-red-400">{error}</span>}
            </div>

            {/* Scrolling Ticker */}
            <div className="relative overflow-hidden">
                <div className="flex animate-ticker gap-1 py-3">
                    {/* Duplicate for seamless loop */}
                    {[...tickerData, ...tickerData].map((ticker, i) => {
                        const isPositive = ticker.priceChangePercent >= 0;
                        const displayName = SYMBOL_NAMES[ticker.symbol] || ticker.symbol.replace('USDT', '');
                        const icon = SYMBOL_ICONS[ticker.symbol] || '○';
                        const flashState = flashStates.get(ticker.symbol);

                        return (
                            <div
                                key={`${ticker.symbol}-${i}`}
                                className={`
                                    flex items-center gap-3 px-5 py-2 mx-1
                                    bg-slate-800/50 hover:bg-slate-700/50 
                                    rounded-full border border-slate-700/50 
                                    transition-all duration-200 cursor-pointer
                                    hover:border-slate-600 hover:scale-105
                                    ${flashState === 'up' ? 'price-flash-up' : ''}
                                    ${flashState === 'down' ? 'price-flash-down' : ''}
                                `}
                            >
                                {/* Coin Icon */}
                                <span className="text-lg font-bold text-slate-400">{icon}</span>

                                {/* Coin Name */}
                                <span className="font-bold text-white text-sm">{displayName}</span>

                                {/* Price */}
                                <span className="text-slate-200 font-medium text-sm">
                                    ${formatPrice(ticker.price)}
                                </span>

                                {/* Change */}
                                <span className={`
                                    flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full
                                    ${isPositive
                                        ? 'text-green-400 bg-green-500/10'
                                        : 'text-red-400 bg-red-500/10'
                                    }
                                `}>
                                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {isPositive ? '+' : ''}{ticker.priceChangePercent.toFixed(2)}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LiveTicker;
