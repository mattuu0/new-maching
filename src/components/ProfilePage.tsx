import React from 'react';
import { User, Settings, Shield, Bell, ChevronRight, LogOut, Heart, BarChart3 } from 'lucide-react';

/**
 * ユーザープロフィールコンポーネント
 */
export const ProfilePage: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
            {/* プロフィールヘッダー */}
            <div className="bg-white p-8 pt-12 text-center border-b border-gray-100">
                <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 mx-auto">
                        S
                    </div>
                    <div className="absolute bottom-4 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">サンプルユーザー</h2>
                <p className="text-sm text-gray-500">Premium Member Since 2026</p>
            </div>

            {/* 統計セクション */}
            <div className="flex bg-white border-b border-gray-100 mb-4 px-4 py-6">
                <div className="flex-1 text-center border-r border-gray-100">
                    <div className="flex items-center justify-center text-blue-600 mb-1">
                        <Heart size={18} />
                    </div>
                    <div className="text-xl font-bold">124</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">保存済み</div>
                </div>
                <div className="flex-1 text-center border-r border-gray-100">
                    <div className="flex items-center justify-center text-indigo-600 mb-1">
                        <BarChart3 size={18} />
                    </div>
                    <div className="text-xl font-bold">582</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">閲覧数</div>
                </div>
                <div className="flex-1 text-center">
                    <div className="flex items-center justify-center text-purple-600 mb-1">
                        <Shield size={18} />
                    </div>
                    <div className="text-xl font-bold">LV.12</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ニュースマニア</div>
                </div>
            </div>

            {/* 設定メニュー */}
            <div className="px-4 pb-8 space-y-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <ProfileMenuItem icon={<User size={18} />} title="パーソナライズ設定" subtitle="AIの好みを調整する" />
                    <ProfileMenuItem icon={<Bell size={18} />} title="プッシュ通知" subtitle="速報を受け取る" />
                    <ProfileMenuItem icon={<Shield size={18} />} title="プライバシー" subtitle="データとセキュリティ" />
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <ProfileMenuItem icon={<Settings size={18} />} title="アプリ設定" />
                    <ProfileMenuItem icon={<Shield size={18} />} title="ヘルプとサポート" />
                </div>

                <button className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4 hover:bg-red-100 transition-colors">
                    <LogOut size={18} />
                    ログアウト
                </button>
            </div>
        </div>
    );
};

interface ProfileMenuItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, subtitle }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-0 border-gray-50">
        <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-2.5 rounded-xl text-gray-600">
                {icon}
            </div>
            <div>
                <div className="text-sm font-bold text-gray-900">{title}</div>
                {subtitle && <div className="text-[11px] text-gray-400">{subtitle}</div>}
            </div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
    </div>
);
