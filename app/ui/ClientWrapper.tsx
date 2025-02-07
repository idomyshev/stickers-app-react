"use client";

import { useEffect } from "react";
import { useStickersStore } from "@/store/stickersStore";
import {storageKey} from "@/settings/storage";

export default function ClientWrapper() {
    const loadDatabase = useStickersStore((state) => state.loadDatabase);

    useEffect(() => {
        loadDatabase();

        const onStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey) {
                loadDatabase();
            }
        };

        window.addEventListener("storage", onStorageChange);

        return () => {
            window.removeEventListener("storage", onStorageChange);
        };
    }, []);

    return null;
}