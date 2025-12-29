'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Ad {
    id: string;
    title: string;
    type: 'IMAGE' | 'VIDEO' | 'TEXT';
    content: string;
    linkUrl?: string;
    position?: string;
}

interface AdBannerProps {
    position: 'header' | 'sidebar' | 'footer' | 'inline';
    className?: string;
}

export default function AdBanner({ position, className = '' }: AdBannerProps) {
    const [ad, setAd] = useState<Ad | null>(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const res = await fetch(`/api/ads?active=true&position=${position}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.ads && data.ads.length > 0) {
                        // Get random ad from available ads
                        const randomAd = data.ads[Math.floor(Math.random() * data.ads.length)];
                        setAd(randomAd);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch ad', error);
            }
        };

        fetchAd();
    }, [position]);

    if (!ad) return null;

    const AdContent = () => {
        if (ad.type === 'IMAGE') {
            return (
                <img
                    src={ad.content}
                    alt={ad.title}
                    className="w-full h-auto rounded-lg"
                />
            );
        }

        if (ad.type === 'VIDEO') {
            return (
                <div className="aspect-video">
                    <iframe
                        src={ad.content}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                    />
                </div>
            );
        }

        // TEXT ad
        return (
            <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/20 rounded-lg p-4">
                <p className="text-white font-medium">{ad.content}</p>
                {ad.linkUrl && (
                    <span className="text-green-400 text-sm mt-2 inline-block">Learn more →</span>
                )}
            </div>
        );
    };

    return (
        <div className={`ad-banner ${className}`}>
            {ad.linkUrl ? (
                <Link href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <AdContent />
                </Link>
            ) : (
                <div className="block">
                    <AdContent />
                </div>
            )}
            <p className="text-xs text-gray-500 text-center mt-1">Sponsored</p>
        </div>
    );
}
