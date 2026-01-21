import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { NewsArticle } from '../types/news';
import { Heart, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface NewsCardProps {
    article: NewsArticle;
    onSwipe: (direction: 'left' | 'right') => void;
    isFront: boolean;
}

/**
 * ニュースカードコンポーネント
 * フリック操作（スワイプ）で「興味あり」「興味なし」を切り替えます
 */
export const NewsCard: React.FC<NewsCardProps> = ({ article, onSwipe, isFront }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // スワイプ時のアイコン表示制御
    const likeOpacity = useTransform(x, [50, 150], [0, 1]);
    const dislikeOpacity = useTransform(x, [-50, -150], [0, 1]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    if (!article) return null;

    return (
        <motion.div
            style={{ x, rotate, opacity, zIndex: isFront ? 10 : 0 }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className={cn(
                "absolute w-full h-[70vh] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white touch-none cursor-grab active:cursor-grabbing",
                !isFront && "scale-95 opacity-50 transition-transform duration-300"
            )}
        >
            {/* 背景画像 */}
            <div className="relative h-2/3 w-full">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* タグ表示 */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
                        #{article.tag}
                    </span>
                </div>

                {/* スワイプ時のステータス表示 */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-green-500/80 p-6 rounded-full">
                        <Heart size={80} className="text-white fill-current" />
                    </div>
                </motion.div>
                <motion.div style={{ opacity: dislikeOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-red-500/80 p-6 rounded-full">
                        <X size={80} className="text-white" />
                    </div>
                </motion.div>
            </div>

            {/* テキストコンテンツ */}
            <div className="p-6 flex flex-col justify-between h-1/3">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{article.category}</span>
                        <span className="text-xs text-gray-500">{article.source} · {article.publishedAt}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                        {article.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
