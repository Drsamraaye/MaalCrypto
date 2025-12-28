'use client';

import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themes = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ] as const;

    const currentIcon = {
        light: Sun,
        dark: Moon,
        system: Monitor,
    }[theme];

    const CurrentIcon = currentIcon;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative p-2.5 rounded-xl 
                    bg-slate-100 dark:bg-slate-800 
                    hover:bg-slate-200 dark:hover:bg-slate-700 
                    border border-transparent hover:border-slate-300 dark:hover:border-slate-600
                    transition-all duration-200
                    group
                `}
                title={`Theme: ${theme}`}
            >
                <CurrentIcon className={`
                    w-5 h-5 transition-colors
                    ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-amber-500'}
                `} />

                {/* Glow effect on hover */}
                <span className={`
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity
                    ${resolvedTheme === 'dark'
                        ? 'bg-blue-500/10'
                        : 'bg-amber-500/10'
                    }
                `} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 animate-slide-in-up z-50">
                    {themes.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={() => {
                                setTheme(value);
                                setIsOpen(false);
                            }}
                            className={`
                                w-full flex items-center gap-3 px-4 py-2.5 text-sm
                                transition-colors
                                ${theme === value
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }
                            `}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="flex-1 text-left font-medium">{label}</span>
                            {theme === value && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThemeToggle;
