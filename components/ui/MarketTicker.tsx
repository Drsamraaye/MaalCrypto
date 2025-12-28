import { ArrowUp, ArrowDown } from 'lucide-react';
import { getMarketTickerData } from '@/lib/coingecko';

export default async function MarketTicker() {
  const coins = await getMarketTickerData();

  if (!coins || coins.length === 0) return null;

  return (
    <div className="w-full bg-slate-900 text-white overflow-hidden whitespace-nowrap border-b border-slate-800">
      <div className="inline-flex animate-scroll py-2">
        {/* Tripled list for smooth infinite scroll */}
        {[...coins, ...coins, ...coins].map((coin, i) => {
          const isUp = coin.price_change_percentage_24h >= 0;
          return (
            <div key={`${coin.id}-${i}`} className="flex items-center mx-6 text-sm">
              <span className="font-bold text-slate-300 mr-2 uppercase">{coin.symbol}</span>
              <span className="mr-2">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={`flex items-center text-xs ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                {isUp ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
