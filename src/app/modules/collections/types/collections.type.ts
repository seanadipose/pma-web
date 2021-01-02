export const COLLECTIONS = ['journal', 'user'] as const;

export type CollectionsType = typeof COLLECTIONS[number];
