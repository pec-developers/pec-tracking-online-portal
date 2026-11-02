import { create } from 'zustand';

interface AppState {
  title: string;
  portalStatus: string;
  count: number;
  increment: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  title: 'PEC Tracking Online Portal',
  portalStatus: 'Rebuilding (Single-Domain React + Zustand & NestJS Backend)',
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));

