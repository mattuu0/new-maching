import { NewsArticle } from '../types/news';

export const MOCK_NEWS: NewsArticle[] = [
    {
        id: '1',
        title: '次世代AIモデルがエネルギー効率を50%向上',
        summary: '新しいニューラルネットワーク構造により、計算能力を維持しつつ消費電力を大幅に削減。データセンターの環境負荷軽減が期待されています。',
        content: '詳細な本文がここに入ります...',
        category: 'テクノロジー',
        tag: 'AI',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        publishedAt: '2026-01-21',
        source: 'TechDaily'
    },
    {
        id: '2',
        title: '火星有人探査計画、初の着陸地点が決定',
        summary: 'NASAとSpaceXの共同チームが、地下氷の存在が示唆されるエリス・プラニティア地区を着陸地点に選定。有人拠点構築の鍵となります。',
        content: '詳細な本文がここに入ります...',
        category: 'サイエンス',
        tag: '宇宙',
        imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
        publishedAt: '2026-01-20',
        source: 'ScienceNow'
    },
    {
        id: '3',
        title: '都心で植物由来のシェアサイクルが試験導入',
        summary: 'フレームに強化竹繊維を使用し、製造時のCO2排出を削減した次世代自転車のシェアリングサービスが開始。軽量性と耐久性を両立。',
        content: '詳細な本文がここに入ります...',
        category: 'ライフスタイル',
        tag: 'SDGs',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
        publishedAt: '2026-01-19',
        source: 'EcoTimes'
    },
    {
        id: '4',
        title: '世界的ピアニストがAIと共演、新たな芸術の形',
        summary: 'AIが演奏者の感情をリアルタイムで解析し、完璧に調和する伴奏を生成。クラシック音楽の枠組みを超える試みとして注目されています。',
        content: '詳細な本文がここに入ります...',
        category: 'エンタメ',
        tag: 'アート',
        imageUrl: 'https://images.unsplash.com/photo-1520529611443-424a52047805?auto=format&fit=crop&q=80&w=800',
        publishedAt: '2026-01-21',
        source: 'ArtFocus'
    },
    {
        id: '5',
        title: 'プログラミング教育に革命、VRを活用した没入型学習',
        summary: 'コードの構造を3D空間で視覚化し、直感的にロジックを理解できる学習プラットフォームが登場。学習効率が3倍に向上したとの報告も。',
        content: '詳細な本文がここに入ります...',
        category: 'テクノロジー',
        tag: '教育',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        publishedAt: '2026-01-21',
        source: 'EduTech'
    }
];
