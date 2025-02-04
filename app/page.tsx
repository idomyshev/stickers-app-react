'use client'

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

    return <StickersView editMode={false}/>;
}
