'use client';

import { useEffect, useState } from 'react';

interface ChartDataPoint {
    timestamp: number;
    close: number;
    high: number;
    low: number;
}

interface PriceChartProps {
    symbol: string;
    timeframe?: '24h' | '7d' | '30d';
    height?: number;
    showLabels?: boolean;
}

export function PriceChart({
    symbol,
    timeframe = '7d',
    height = 200,
    showLabels = true
}: PriceChartProps) {
    const [data, setData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchChartData() {
            setLoading(true);
            setError(null);

            try {
                const tf = timeframe === '24h' ? 'hourly' : 'daily';
                const limit = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;

                const res = await fetch(`/api/charts?symbol=${symbol}&timeframe=${tf}&limit=${limit}`);

                if (!res.ok) throw new Error('Failed to fetch chart data');

                const result = await res.json();
                setData(result.data || []);
            } catch (err) {
                console.error('Chart fetch error:', err);
                setError('Failed to load chart');
            } finally {
                setLoading(false);
            }
        }

        fetchChartData();
    }, [symbol, timeframe]);

    if (loading) {
        return (
            <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg" style={{ height }} />
        );
    }

    if (error || data.length === 0) {
        return (
            <div
                className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"
                style={{ height }}
            >
                {error || 'No data available'}
            </div>
        );
    }

    // Calculate chart dimensions
    const width = 400;
    const padding = { top: 10, right: 10, bottom: showLabels ? 30 : 10, left: showLabels ? 50 : 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Calculate min/max for scaling
    const prices = data.map(d => d.close);
    const minPrice = Math.min(...prices) * 0.995;
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice || 1;

    // Determine if price went up or down
    const isPositive = data.length > 1 && data[data.length - 1].close >= data[0].close;
    const lineColor = isPositive ? '#22c55e' : '#ef4444';
    const gradientId = `gradient-${symbol}-${timeframe}`;

    // Generate path
    const points = data.map((d, i) => {
        const x = padding.left + (i / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - ((d.close - minPrice) / priceRange) * chartHeight;
        return { x, y, price: d.close };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full"
            style={{ height }}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={lineColor} stopOpacity="0.05" />
                </linearGradient>
            </defs>

            {/* Area fill */}
            <path d={areaPath} fill={`url(#${gradientId})`} />

            {/* Line */}
            <path
                d={linePath}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Current price dot */}
            <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="4"
                fill={lineColor}
            />

            {/* Labels */}
            {showLabels && (
                <>
                    {/* Y-axis labels */}
                    <text
                        x={padding.left - 5}
                        y={padding.top + 10}
                        textAnchor="end"
                        className="text-xs fill-slate-500"
                    >
                        ${maxPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </text>
                    <text
                        x={padding.left - 5}
                        y={padding.top + chartHeight}
                        textAnchor="end"
                        className="text-xs fill-slate-500"
                    >
                        ${minPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </text>

                    {/* Current price */}
                    <text
                        x={width - 5}
                        y={points[points.length - 1].y + 4}
                        textAnchor="end"
                        className="text-xs font-bold"
                        fill={lineColor}
                    >
                        ${data[data.length - 1].close.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </text>
                </>
            )}
        </svg>
    );
}

export default PriceChart;
