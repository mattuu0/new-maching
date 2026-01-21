import React from 'react';
import { Bookmark, LayoutGrid, Settings } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavigationProps {
    activeView: 'discover' | 'saved';
    onViewChange: (view: 'discover' | 'saved') => void;
}

/**
 * 上部ナビゲーションコンポーネント
 */
export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
            <div className="flex justify-between items-center max-w-lg mx-auto">
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    NewsMatch
                </h1>

                <div className="flex gap-4">
                    <button
                        onClick={() => onViewChange('discover')}
                        className={cn(
                            "p-2 rounded-xl transition-all duration-200",
                            activeView === 'discover' ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                        title="記事を探す"
                    >
                        <LayoutGrid size={24} />
                    </button>
                    <button
                        onClick={() => onViewChange('saved')}
                        className={cn(
                            "p-2 rounded-xl transition-all duration-200",
                            activeView === 'saved' ? "bg-red-50 text-red-600" : "text-gray-400 hover:text-gray-600"
                        )}
                        title="保存した記事"
                    >
                        <Bookmark size={24} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Settings size={22} />
                    </button>
                </div>
            </div>
        </header>
    );
};
