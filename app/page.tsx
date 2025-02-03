'use client'

import styles from './page.module.scss';
import {useEffect} from "react";
import {storageKey} from "@/settings/storage";
import {StickersView} from "@/app/ui/StickersView";
import {useStickersStore} from "@/store/stickersStore";

export default function Home() {
    const loadDatabase = useStickersStore((state) => state.loadDatabase);

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
            <StickersView editMode={true}/>
        </div>
    );
}
