import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, ArrowLeftRight } from 'lucide-react';

interface TutorialOverlayProps {
    isVisible: boolean;
    onClose: () => void;
}

/**
 * 初回起動時のスワイプチュートリアルオーバーレイ
 */
export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ isVisible, onClose }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8 text-center cursor-pointer"
                    onClick={onClose}
                >
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative">
                            {/* スワイプを促す手のアイコンアニメーション */}
                            <motion.div
                                animate={{
                                    x: [-60, 60, -60],
                                    rotate: [-10, 10, -10]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-white bg-blue-600 p-6 rounded-full shadow-2xl relative z-10"
                            >
                                <Hand size={64} fill="currentColor" />
                            </motion.div>

                            {/* 背景の矢印アニメーション */}
                            <motion.div
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 text-white/30"
                            >
                                <ArrowLeftRight size={160} />
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-black text-white tracking-tight">
                                スワイプして選別
                            </h2>
                            <p className="text-gray-200 text-sm font-medium leading-relaxed">
                                気になるニュースは<span className="text-green-400 font-bold">右</span>へ、<br />
                                興味がないときは<span className="text-red-400 font-bold">左</span>へスワイプ。
                            </p>
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="pt-4"
                            >
                                <span className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm">
                                    はじめる
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
