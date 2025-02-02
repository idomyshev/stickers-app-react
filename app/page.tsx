'use client'

import styles from './page.module.scss';
import {useEffect, useState} from "react";
import {storageKey} from "@/settings/storage";
import {ISticker} from "@/types";
import {StickersView} from "@/app/ui/StickersView";
import {useStickersStore} from "@/store/stickersStore";

export default function Home() {
    const stopDataLoading = useStickersStore((state) => state.stopDataLoading);

    const [stickers, setStickers] = useState<ISticker[]>([
        // {id: "123", text: "My first sticker"},
        // {id: "234", text: "Second sticker"}
        ]
    );

    const loadDatabase = () => {
        const json = localStorage.getItem(storageKey);

        if (json) {
            const parsedJson = JSON.parse(json);

            if (parsedJson && parsedJson.length) {
                setStickers(parsedJson);
            }
        }

        stopDataLoading();
    };

    useEffect(() => {
        loadDatabase();
        window.addEventListener("storage", (event) => {
            if (event.key === storageKey) {
                loadDatabase();
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            <div></div>
            <StickersView editMode={true} stickers={stickers}/>
        </div>
    );
}
