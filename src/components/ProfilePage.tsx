import React, { useState } from 'react';
import { Calendar, Link as LinkIcon, MapPin, ChevronRight, Bookmark } from 'lucide-react';
import type { NewsArticle } from '../types/news';
import { cn } from '../utils/cn';
import { NewsDetailModal } from './NewsDetailModal';

interface ProfilePageProps {
    savedArticles: NewsArticle[];
}

/**
 * ユーザープロフィールコンポーネント (Twitter風)
 */
export const ProfilePage: React.FC<ProfilePageProps> = ({ savedArticles }) => {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [activeTab, setActiveTab] = useState<'saved' | 'likes'>('saved');

    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar">
            {/* 詳細モーダル */}
            <NewsDetailModal
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
            />

            {/* ヘッダー背景（カバー画像） */}
            <div className="relative h-32 shrink-0 bg-gray-200">
                <img
                    src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="cover"
                />
            </div>

            {/* プロフィール情報エリア */}
            <div className="px-5 pb-4 relative">
                {/* プロフィール画像 */}
                <div className="absolute -top-12 left-5">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-md">
                        S
                    </div>
                </div>

                {/* プロフィール編集ボタン（モック） */}
                <div className="flex justify-end pt-3">
                    <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm font-black hover:bg-gray-50 transition-colors">
                        プロフィールを編集
                    </button>
                </div>

                {/* ユーザー名・ID */}
                <div className="mt-4">
                    <h2 className="text-xl font-black text-gray-900 leading-tight">サンプルユーザー</h2>
                    <p className="text-gray-500 text-sm">@sample_user_2026</p>
                </div>

                {/* 自己紹介 */}
                <p className="mt-3 text-sm text-gray-800 leading-relaxed">
                    最新のテクノロジーとサイエンスに興味があります。AIが変える未来を NewsMatch で追いかけています。🔭💻 #Tech #Science #Future
                </p>

                {/* メタ情報（場所・リンク・登録日） */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-gray-500 text-[13px]">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>東京, 日本</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                        <LinkIcon size={14} />
                        <span>newsmatch.jp/profile</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>2026年1月から利用しています</span>
                    </div>
                </div>

                {/* フォロー・フォロワー */}
                <div className="mt-3 flex gap-4 text-sm">
                    <div className="flex gap-1">
                        <span className="font-black text-gray-900">128</span>
                        <span className="text-gray-500">フォロー中</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-black text-gray-900">1.2K</span>
                        <span className="text-gray-500">フォロワー</span>
                    </div>
                </div>
            </div>

            {/* タブメニュー */}
            <div className="flex border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <button
                    onClick={() => setActiveTab('saved')}
                    className="flex-1 py-4 text-sm font-bold relative group"
                >
                    <span className={cn(activeTab === 'saved' ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700")}>保存済み</span>
                    {activeTab === 'saved' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('likes')}
                    className="flex-1 py-4 text-sm font-bold relative group"
                >
                    <span className={cn(activeTab === 'likes' ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700")}>いいね</span>
                    {activeTab === 'likes' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full" />}
                </button>
            </div>

            {/* コンテンツリスト */}
            <div className="flex-1">
                {activeTab === 'saved' ? (
                    savedArticles.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {savedArticles.map(article => (
                                <div
                                    key={article.id}
                                    onClick={() => setSelectedArticle(article)}
                                    className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                        <img src={article.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between py-0.5 min-w-0">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter shrink-0">{article.category}</span>
                                                <span className="text-[10px] text-gray-400">·</span>
                                                <span className="text-[10px] text-gray-500 font-medium truncate">{article.source}</span>
                                            </div>
                                            <h4 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-snug">
                                                {article.title}
                                            </h4>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[10px] text-gray-400 font-medium">#{article.tag}</span>
                                            <ChevronRight size={14} className="text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
                            <div className="bg-gray-100 p-4 rounded-full mb-3 text-gray-400">
                                <Bookmark size={32} />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">保存済みのニュースはありません</h3>
                            <p className="text-xs text-gray-500 mt-1">気になる記事をスワイプして保存すると、ここに表示されます。</p>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                        <p className="text-sm font-bold text-gray-400">いいねしたニュースはまだありません</p>
                    </div>
                )}
            </div>
        </div>
    );
};
