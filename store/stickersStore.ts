import { create } from 'zustand'
import {ISticker, IStickerForm} from "@/types";
import {storageKey} from "@/settings/storage";
import { v4 as uuidv4 } from "uuid";

interface StickersStore {
    stickers: ISticker[];
    isDataLoading: boolean;
    startDataLoading: () => void;
    stopDataLoading: () => void;
    updateDatabase: () => void;
    loadDatabase: () => void;
    addSticker: (item: IStickerForm) => void;
    editSticker: (item: ISticker) => void;
}

export const useStickersStore = create<StickersStore>((set, get) => ({
    stickers: [],
    isDataLoading: true,
    startDataLoading: () => set({ isDataLoading: true }),
    stopDataLoading: () => set({ isDataLoading: false }),
    updateDatabase: () => {
        const {stickers} = get();
        localStorage.setItem(storageKey, JSON.stringify(stickers));
    },
    loadDatabase: () => {
        let {stopDataLoading} = get();
        const json = localStorage.getItem(storageKey);

        if (json) {
            const parsedJson = JSON.parse(json);

            if (parsedJson && parsedJson.length) {
                set({ stickers: parsedJson })
            }
        }

        stopDataLoading();
    },
    addSticker: (item: IStickerForm) => {
        const {stickers, updateDatabase} = get();
        stickers.push({ id: uuidv4(), ...item });
        updateDatabase();
    },
    editSticker:(item: ISticker) => {
        const { stickers, updateDatabase } = get();
        const { id, ...form } = item;
        const foundItem = stickers.find((el) => el.id === id);

        if (foundItem) {
            Object.assign(foundItem, form);
        }

        updateDatabase();
    }
}) satisfies StickersStore
)