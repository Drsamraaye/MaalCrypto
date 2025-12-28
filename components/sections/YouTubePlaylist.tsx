'use client';

import { Play } from 'lucide-react';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    author: string;
}

interface YouTubePlaylistProps {
    title?: string;
    mainVideoId?: string;
    videos?: Video[];
}

const DEFAULT_VIDEOS: Video[] = [
    {
        id: 'dQw4w9WgXcQ',
        title: 'Sidee Cryptocurrency Loo Maalgashtaa 2024',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        author: 'GELLE BASHER'
    },
    {
        id: 'dQw4w9WgXcQ',
        title: 'Qaabab Fudud oo Crypto Lacag Looga Sameeyo',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        author: 'GELLE BASHER'
    },
    {
        id: 'dQw4w9WgXcQ',
        title: 'Wax ka agow Lacagta cusub ee Bitcoin?',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        author: 'GELLE BASHER'
    },
    {
        id: 'dQw4w9WgXcQ',
        title: 'Binance Tutorial Bilaw ilaa Dhamaad 2025',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        author: 'GELLE BASHER'
    }
];

export function YouTubePlaylist({
    title = 'YouTube Playlist',
    mainVideoId = 'dQw4w9WgXcQ',
    videos = DEFAULT_VIDEOS
}: YouTubePlaylistProps) {
    return (
        <section className="py-16 bg-black">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-green-500 rounded"></span>
                    {title}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Video Player */}
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                            <iframe
                                src={`https://www.youtube.com/embed/${mainVideoId}?rel=0`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
                        {/* Playlist Header */}
                        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                            <span className="text-white text-sm font-medium">NOW PLAYING</span>
                            <span className="text-neutral-400 text-xs">1/4</span>
                        </div>

                        {/* Video List */}
                        <div className="divide-y divide-neutral-800">
                            {videos.map((video, index) => (
                                <button
                                    key={index}
                                    className="w-full p-3 flex items-start gap-3 hover:bg-neutral-800 transition-colors text-left group"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative w-24 h-14 flex-shrink-0 rounded overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </div>


                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white text-sm font-medium line-clamp-2 mb-1 group-hover:text-green-400 transition-colors">
                                            {video.title}
                                        </h4>
                                        <p className="text-neutral-500 text-xs uppercase">
                                            {video.author}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Play All Button */}
                        <div className="p-4">
                            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm uppercase rounded transition-colors flex items-center justify-center gap-2">
                                <Play className="w-4 h-4 fill-current" />
                                Play All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default YouTubePlaylist;
