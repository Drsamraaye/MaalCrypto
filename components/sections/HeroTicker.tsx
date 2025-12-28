'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useBinanceTicker } from '@/hooks/useBinanceTicker';

const TICKER_COINS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT'];

export default function HeroTicker() {
    const { getTicker } = useBinanceTicker();
    const [tickerData, setTickerData] = useState<any[]>([]);

    useEffect(() => {
        // Initial fetch
        const updateData = () => {
            const data = TICKER_COINS.map(symbol => {
                const t = getTicker(symbol);
                return {
                    symbol: symbol.replace('USDT', ''),
                    price: t?.price || 0,
                    change: t?.priceChangePercent || 0,
                    icon: getIconForSymbol(symbol)
                };
            });
            setTickerData(data);
        };

        const interval = setInterval(updateData, 1000);

        // Run immediately if possible, or wait for next tick
        updateData();

        return () => clearInterval(interval);
    }, [getTicker]);

    return (
        <div className="mt-12 flex flex-wrap justify-center gap-6">
            {tickerData.map((coin) => {
                const isUp = coin.change >= 0;
                return (
                    <div key={coin.symbol} className="flex items-center gap-4 px-6 py-4 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl hover:border-green-500/50 transition-all min-w-[200px] group">
                        <span className="text-3xl filter drop-shadow-lg">{coin.icon}</span>
                        <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{coin.symbol}</p>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {isUp ? '+' : ''}{coin.change.toFixed(2)}%
                                </span>
                            </div>
                            <p className="text-white font-black text-xl tracking-tight group-hover:text-green-400 transition-colors">
                                ${coin.price > 0 ? coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '---'}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function getIconForSymbol(symbol: string) {
    switch (symbol) {
        case 'BTCUSDT': return '₿';
        case 'ETHUSDT': return 'Ξ';
        case 'BNBUSDT': return '◆';
        case 'SOLUSDT': return '◎';
        default: return '●';
    }
}
