import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwindのクラス名を効率的に結合するためのユーティリティ
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
