'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useBinanceTicker } from '@/hooks/useBinanceTicker';
import { SUPPORTED_SYMBOLS, SYMBOL_NAMES } from '@/lib/binance';

// Coin icons mapping
const COIN_ICONS: Record<string, string> = {
    'BTCUSDT': '₿',
    'ETHUSDT': 'Ξ',
    'BNBUSDT': '◆',
    'SOLUSDT': '◎',
    'XRPUSDT': '✕',
    'DOGEUSDT': 'Ð',
    'ADAUSDT': '₳',
    'AVAXUSDT': '▲',
    'DOTUSDT': '●',
    'LINKUSDT': '⬡',
};

interface TickerItemProps {
    symbol: string;
    price: number;
    priceChangePercent: number;
}

function TickerItem({ symbol, price, priceChangePercent }: TickerItemProps) {
    const isPositive = priceChangePercent >= 0;
    const displayName = SYMBOL_NAMES[symbol] || symbol.replace('USDT', '');
    const icon = COIN_ICONS[symbol] || '●';

    return (
        <div className="flex items-center gap-2 px-4 whitespace-nowrap">
            <span className="text-lg">{icon}</span>
            <span className="font-semibold text-gray-900">{displayName}</span>
            <span className="text-gray-600">
                ${price > 0 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---'}
            </span>
            <span className={`font-medium flex items-center gap-0.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {priceChangePercent.toFixed(2)}%
            </span>
        </div>
    );
}

export function MarketTickerGelle() {
    const { getAllTickers, isConnected } = useBinanceTicker();
    const [prices, setPrices] = useState<Map<string, TickerItemProps>>(new Map());

    useEffect(() => {
        const interval = setInterval(() => {
            const tickers = getAllTickers();
            const newPrices = new Map<string, TickerItemProps>();

            tickers.forEach((ticker) => {
                newPrices.set(ticker.symbol, {
                    symbol: ticker.symbol,
                    price: ticker.price,
                    priceChangePercent: ticker.priceChangePercent,
                });
            });

            setPrices(newPrices);
        }, 500);

        return () => clearInterval(interval);
    }, [getAllTickers]);

    const tickerItems = SUPPORTED_SYMBOLS.map(symbol =>
        prices.get(symbol) || {
            symbol,
            price: 0,
            priceChangePercent: 0,
        }
    );

    return (
        <div className="bg-white border-b border-gray-200 py-2 overflow-hidden">
            <div className="relative">
                {/* Scrolling ticker */}
                <div
                    className="flex"
                    style={{
                        animation: 'ticker-scroll 30s linear infinite',
                    }}
                >
                    {/* Double the items for seamless loop */}
                    {[...tickerItems, ...tickerItems].map((item, index) => (
                        <TickerItem
                            key={`${item.symbol}-${index}`}
                            symbol={item.symbol}
                            price={item.price}
                            priceChangePercent={item.priceChangePercent}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MarketTickerGelle;
