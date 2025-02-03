import { create } from 'zustand'
import {ISticker, IStickerForm} from "@/types";
import {storageKey} from "@/settings/storage";
import { v4 as uuidv4 } from "uuid";
import {devtools} from "zustand/middleware";

interface StickersStore {
    stickers: ISticker[];
    isDataLoading: boolean;
    startDataLoading: () => void;
    stopDataLoading: () => void;
    updateDatabase: () => void;
    loadDatabase: () => void;
    addSticker: (item: IStickerForm) => void;
    editSticker: (item: ISticker) => void;
    deleteSticker: (item: ISticker) => void;
}

export const useStickersStore = create<StickersStore>(devtools((set, get) => ({
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
        const newSticker = { id: uuidv4(), ...item };
        set(({stickers}) => ({
            stickers: [...stickers, newSticker]
        }));
        get().updateDatabase();
    },
    editSticker: (item: ISticker) => {
        const { id, ...form } = item;
        set(({ stickers }) => ({
            stickers: stickers.map((el) =>
                el.id === id ? { ...el, ...form } : el
            )
        }));
        get().updateDatabase();
    },
    deleteSticker: (item: ISticker) => {
        set(({stickers}) => ({
            stickers: stickers.filter((el) => el.id !== item.id)
        }));
        get().updateDatabase();
    }
}) satisfies StickersStore))