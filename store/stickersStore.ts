import { create } from 'zustand'

export const useStickersStore = create((set) => ({
    isDataLoading: true,
    startDataLoading: () => set({ isDataLoading: true }),
    stopDataLoading: () => set({ isDataLoading: false }),
}))