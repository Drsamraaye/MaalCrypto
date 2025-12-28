'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageToggle() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale = pathname.startsWith('/so') ? 'so' : 'en';

    const toggleLanguage = () => {
        const newLocale = currentLocale === 'en' ? 'so' : 'en';
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-xs font-bold border border-slate-300 rounded-md hover:bg-slate-100 transition-colors uppercase"
        >
            {currentLocale}
        </button>
    );
}
