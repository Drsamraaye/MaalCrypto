'use client';

interface SparklineProps {
    data: number[];
    isUp: boolean;
}

export default function CoinSparkline({ data, isUp }: SparklineProps) {
    if (!data || data.length === 0) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Normalize data to 0-100 scale for SVG viewBox
    const normalizedData = data.map(val =>
        range === 0 ? 50 : ((val - min) / range) * 100
    );

    // Create SVG path
    const step = 100 / (data.length - 1);
    const pathData = normalizedData
        .map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${100 - y}`)
        .join(' ');

    const color = isUp ? '#16a34a' : '#dc2626';

    return (
        <div className="w-full h-[50px] overflow-hidden">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <path
                    d={pathData}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
