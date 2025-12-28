'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { BINANCE_WS_URL, SUPPORTED_SYMBOLS } from '@/lib/binance';

export interface TickerUpdate {
    symbol: string;
    price: number;
    priceChange: number;
    priceChangePercent: number;
    high24h: number;
    low24h: number;
    volume: number;
    lastUpdate: number;
}

interface BinanceWsMessage {
    e: string; // Event type
    s: string; // Symbol
    c: string; // Close price
    p: string; // Price change
    P: string; // Price change percent
    h: string; // High price
    l: string; // Low price
    v: string; // Base volume
    q: string; // Quote volume
}

interface UseBinanceTickerOptions {
    symbols?: string[];
    enabled?: boolean;
}

export function useBinanceTicker(options: UseBinanceTickerOptions = {}) {
    const { symbols = SUPPORTED_SYMBOLS, enabled = true } = options;

    const [tickers, setTickers] = useState<Map<string, TickerUpdate>>(new Map());
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback(() => {
        if (!enabled || typeof window === 'undefined') return;

        // Build stream names for mini ticker
        const streams = symbols.map(s => `${s.toLowerCase()}@miniTicker`).join('/');
        const wsUrl = `${BINANCE_WS_URL}/${streams}`;

        try {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                setIsConnected(true);
                setError(null);
                console.log('Binance WebSocket connected');
            };

            ws.onmessage = (event) => {
                try {
                    const data: BinanceWsMessage = JSON.parse(event.data);

                    if (data.e === '24hrMiniTicker') {
                        setTickers(prev => {
                            const newMap = new Map(prev);
                            newMap.set(data.s, {
                                symbol: data.s,
                                price: parseFloat(data.c),
                                priceChange: parseFloat(data.p || '0'),
                                priceChangePercent: parseFloat(data.P || '0'),
                                high24h: parseFloat(data.h),
                                low24h: parseFloat(data.l),
                                volume: parseFloat(data.v),
                                lastUpdate: Date.now()
                            });
                            return newMap;
                        });
                    }
                } catch (e) {
                    console.error('Failed to parse WebSocket message:', e);
                }
            };

            ws.onerror = (event) => {
                console.error('WebSocket error:', event);
                setError('WebSocket connection error');
            };

            ws.onclose = () => {
                setIsConnected(false);
                console.log('WebSocket closed, reconnecting in 3s...');

                // Auto-reconnect after 3 seconds
                reconnectTimeoutRef.current = setTimeout(() => {
                    connect();
                }, 3000);
            };
        } catch (e) {
            console.error('Failed to create WebSocket:', e);
            setError('Failed to connect to Binance');
        }
    }, [symbols, enabled]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsConnected(false);
    }, []);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [connect, disconnect]);

    // Get ticker for a specific symbol
    const getTicker = useCallback((symbol: string): TickerUpdate | undefined => {
        return tickers.get(symbol);
    }, [tickers]);

    // Get all tickers as array
    const getAllTickers = useCallback((): TickerUpdate[] => {
        return Array.from(tickers.values());
    }, [tickers]);

    return {
        tickers,
        getTicker,
        getAllTickers,
        isConnected,
        error,
        connect,
        disconnect
    };
}

export default useBinanceTicker;
