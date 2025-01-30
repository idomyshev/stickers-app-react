'use client'

import classes from './page.module.scss';
import {useEffect, useState} from "react";
import {storageKey} from "@/settings/storage";
import {ISticker} from "@/types";
import {StickersView} from "@/app/ui/StickersView";

export default function Home() {
    const [stickers, setStickers] = useState<ISticker[]>([
        {id: "123", text: "My first sticker"},
        {id: "234", text: "Second sticker"}]
    );
    const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

    const loadDatabase = () => {
        const json = localStorage.getItem(storageKey);

        if (json) {
            const parsedJson = JSON.parse(json);

            if (parsedJson && parsedJson.length) {
                setStickers(parsedJson);
            }
        }

        setIsDataLoading(false);
    };

    //setStickers([{name: "My first sticker"}])

    useEffect(() => {
        loadDatabase();
        window.addEventListener("storage", (event) => {
            if (event.key === storageKey) {
                loadDatabase();
            }
        });
    }, []);

    return (
        <div className={classes.container}>
            <StickersView editMode={true} stickers={stickers}/>
        </div>
    );
}
