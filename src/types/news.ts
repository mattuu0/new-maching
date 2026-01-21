/**
 * ニュース記事の型定義
 */
export interface NewsArticle {
    id: string;
    title: string;
    summary: string; // AIによって要約された本文
    content: string; // 元の本文
    category: string;
    tag: string;
    imageUrl: string;
    publishedAt: string;
    source: string;
}

/**
 * ユーザーのインタラクション状態
 */
export type InteractionStatus = 'none' | 'liked' | 'disliked';
