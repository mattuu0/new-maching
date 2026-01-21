import { useState, useEffect, useCallback } from 'react';
import { MOCK_NEWS } from './data/mockNews';
import type { NewsArticle } from './types/news';
import { NewsCard } from './components/NewsCard';
import { Navigation } from './components/Navigation';
import { SavedNewsView } from './components/SavedNewsView';
import { ProfilePage } from './components/ProfilePage';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, LayoutGrid, Bookmark, User as UserIcon } from 'lucide-react';
import { cn } from './utils/cn';

/**
 * ビューの型定義
 */
type ActiveView = 'discover' | 'saved' | 'profile';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('discover');
  const [newsStack, setNewsStack] = useState<NewsArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);

  /**
   * 無限にモックニュースを生成するための関数
   */
  const generateMoreNews = useCallback(() => {
    const moreNews = MOCK_NEWS.map(news => ({
      ...news,
      id: `${news.id}-${Date.now()}-${Math.random()}`
    }));
    setNewsStack(prev => [...prev, ...moreNews]);
  }, []);

  // 初期データの読み込み
  useEffect(() => {
    setNewsStack([...MOCK_NEWS]);
  }, []);

  // スタックが少なくなったら自動的に追加（無限スクロール）
  useEffect(() => {
    if (newsStack.length < 3 && newsStack.length > 0) {
      generateMoreNews();
    }
  }, [newsStack.length, generateMoreNews]);

  /**
   * スワイプ処理
   */
  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedArticle = newsStack[0];
    if (!swipedArticle) return;

    if (direction === 'right') {
      setSavedArticles(prev => {
        if (prev.find(a => a.title === swipedArticle.title)) return prev;
        return [swipedArticle, ...prev];
      });
    }

    setNewsStack(prev => prev.slice(1));
  };

  const handleReset = () => {
    setNewsStack([...MOCK_NEWS]);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden font-sans border-x border-gray-100">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
            NewsMatch
          </h1>
          <div className="flex gap-1">
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">β 版</span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden bg-gray-50/50">
        <AnimatePresence mode="wait">
          {activeView === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center p-6"
            >
              <div className="relative w-full h-full max-h-[580px] flex items-center justify-center">
                <AnimatePresence>
                  {newsStack.length > 0 ? (
                    newsStack.slice(0, 2).reverse().map((article, index) => (
                      <NewsCard
                        key={article.id}
                        article={article}
                        isFront={index === 1 || newsStack.length === 1}
                        onSwipe={handleSwipe}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
                    >
                      <div className="bg-blue-50 p-6 rounded-full inline-block mb-4 text-blue-600">
                        <RotateCcw
                          size={40}
                          className="cursor-pointer hover:rotate-180 transition-transform duration-500"
                          onClick={handleReset}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">すべて読み終えました</h3>
                      <p className="text-sm text-gray-500 mb-6">新しいニュースを読み込み中...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 操作ヒント */}
              {newsStack.length > 0 && (
                <div className="mt-8 flex gap-12 items-center">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-14 h-14 border-2 border-gray-100 bg-white shadow-sm group-hover:bg-red-50 group-hover:border-red-200 rounded-full flex items-center justify-center text-gray-400 group-hover:text-red-500 transition-all active:scale-90">
                      <span className="text-2xl font-light">✕</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">見ない</span>
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-14 h-14 border-2 border-gray-100 bg-white shadow-sm group-hover:bg-green-50 group-hover:border-green-200 rounded-full flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-all active:scale-90">
                      <span className="text-2xl">♥</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">気になる</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <SavedNewsView savedArticles={savedArticles} />
            </motion.div>
          )}

          {activeView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="h-full"
            >
              <ProfilePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ボトムナビゲーション */}
      <nav className="bg-white border-t border-gray-100 px-6 py-3 pb-8 flex justify-around items-center">
        <BottomTab
          active={activeView === 'discover'}
          onClick={() => setActiveView('discover')}
          icon={<LayoutGrid size={24} />}
          label="探す"
          color="blue"
        />
        <BottomTab
          active={activeView === 'saved'}
          onClick={() => setActiveView('saved')}
          icon={<Bookmark size={24} />}
          label="保存"
          color="red"
        />
        <BottomTab
          active={activeView === 'profile'}
          onClick={() => setActiveView('profile')}
          icon={<UserIcon size={24} />}
          label="設定"
          color="indigo"
        />
      </nav>
    </div>
  );
}

interface BottomTabProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'red' | 'indigo';
}

const BottomTab: React.FC<BottomTabProps> = ({ active, onClick, icon, label, color }) => {
  const colors = {
    blue: active ? "text-blue-600" : "text-gray-400",
    red: active ? "text-red-500" : "text-gray-400",
    indigo: active ? "text-indigo-600" : "text-gray-400",
  };

  const bgColors = {
    blue: active ? "bg-blue-50" : "group-hover:bg-gray-50",
    red: active ? "bg-red-50" : "group-hover:bg-gray-50",
    indigo: active ? "bg-indigo-50" : "group-hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      className={cn("flex flex-col items-center gap-1 group transition-all", colors[color])}
    >
      <div className={cn("p-2 rounded-2xl transition-all", bgColors[color])}>
        {icon}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
};

export default App;
