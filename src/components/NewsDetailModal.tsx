import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Bookmark } from 'lucide-react';
import type { NewsArticle } from '../types/news';

interface NewsDetailModalProps {
    article: NewsArticle | null;
    onClose: () => void;
}

/**
 * ニュース詳細表示用モーダルコンポーネント
 * AIによる要約をメインに表示します
 */
export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ article, onClose }) => {
    if (!article) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* ヘッダー画像エリア */}
                    <div className="relative h-64 shrink-0">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />

                        {/* 閉じるボタン */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* カテゴリタグ */}
                        <div className="absolute bottom-6 left-8 flex gap-2">
                            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                {article.category}
                            </span>
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold rounded-full shadow-lg">
                                #{article.tag}
                            </span>
                        </div>
                    </div>

                    {/* コンテンツエリア */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase">
                                    <Calendar size={12} />
                                    {article.publishedAt.replace(/-/g, '/')}
                                </div>
                                <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                <div className="text-[10px] font-bold uppercase tracking-widest">{article.source}</div>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">
                                {article.title}
                            </h2>
                        </div>

                        {/* AI要約セクション */}
                        <div className="bg-blue-50/50 rounded-[32px] p-6 border border-blue-100/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Bookmark size={48} className="text-blue-600" />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">AI 要約分析</span>
                            </div>
                            <p className="text-gray-800 leading-relaxed font-bold text-lg">
                                {article.summary}
                            </p>
                        </div>

                        {/* 本文（AI要約をメインとするため簡略化、またはプレースホルダー） */}
                        <div className="space-y-4 pb-8">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">詳細レポート</h3>
                            <p className="text-gray-600 leading-loose">
                                {article.content || "このニュースの詳細な分析と背景情報は、現在AIによって生成されています。最新の動向に基づいた包括的な情報を提供するため、複数のソースからデータを統合し、精度の高い内容をお届けします。"}
                            </p>
                        </div>
                    </div>

                    {/* アクションバー */}
                    <div className="p-6 bg-white border-t border-gray-50 flex gap-4 shrink-0">
                        <button
                            onClick={onClose}
                            className="flex-1 h-14 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black active:scale-95 transition-all shadow-xl shadow-gray-200"
                        >
                            閉じる
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
