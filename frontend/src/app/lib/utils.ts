// lib/utils.ts
export function cn(...inputs: string[]) {
    return inputs.filter(Boolean).join(' ');
}
