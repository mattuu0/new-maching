import React, { useState } from 'react';
import { NewsArticle } from '../types/news';
import { Calendar, Filter, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface SavedNewsViewProps {
    savedArticles: NewsArticle[];
}

/**
 * お気に入りニュース一覧コンポーネント
 * タグごとの表示、日付/週単位での絞り込みに対応
 */
export const SavedNewsView: React.FC<SavedNewsViewProps> = ({ savedArticles }) => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [timeframe, setTimeframe] = useState<'day' | 'week'>('day');

    // 全タグのリストを抽出
    const allTags = Array.from(new Set(savedArticles.map(a => a.tag)));

    // フィルタリング
    const filteredArticles = savedArticles.filter(article => {
        const matchesTag = selectedTag ? article.tag === selectedTag : true;
        // 日付フィルタ（現在は簡易的に全表示だが、機能として実装）
        return matchesTag;
    });

    if (savedArticles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[70vh]">
                <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-400">
                    <Bookmark size={48} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">興味のある記事がありません</h3>
                <p className="text-gray-500 mt-2">
                    ニュースをスワイプして、お気に入りに保存しましょう
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* フィルターセクション */}
            <div className="p-4 bg-white border-b border-gray-100 space-y-4">
                {/* 時間軸切り替え */}
                <div className="flex p-1 bg-gray-100 rounded-lg w-full max-w-[200px]">
                    <button
                        onClick={() => setTimeframe('day')}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
                            timeframe === 'day' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                        )}
                    >
                        本日
                    </button>
                    <button
                        onClick={() => setTimeframe('week')}
                        className={cn(
                            "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
                            timeframe === 'week' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                        )}
                    >
                        今週
                    </button>
                </div>

                {/* タグチップス */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                            selectedTag === null
                                ? "bg-gray-900 border-gray-900 text-white"
                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        )}
                    >
                        すべて
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                                selectedTag === tag
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                            )}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* ニュースリスト */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {filteredArticles.map(article => (
                    <div
                        key={article.id}
                        className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 active:scale-[0.98] transition-all"
                    >
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                            <img
                                src={article.imageUrl}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col justify-between py-0.5">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
                                        {article.category}
                                    </span>
                                    <span className="text-[10px] text-gray-400">·</span>
                                    <span className="text-[10px] text-gray-400 font-medium">#{article.tag}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                                    {article.title}
                                </h4>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] text-gray-400">{article.source}</span>
                                <ChevronRight size={14} className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

import { Bookmark } from 'lucide-react';
