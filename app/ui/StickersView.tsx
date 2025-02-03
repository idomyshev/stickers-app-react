import styles from './StickersView.module.scss';
import { BasicButton } from "@/app/ui/basic/BasicButton";
import { ISticker } from "@/types";
import { Sticker } from "@/app/ui/Sticker";
import AddIcon from "@/app/ui/icons/icons/AddIcon";
import { useStickersStore } from "@/store/stickersStore";
import { lang } from "@/lang";
import {useRef, useState} from "react";
import {StickerDrawer} from "@/app/ui/drawers/StickerDrawer";


export const StickersView = ({editMode}: {editMode: boolean}) => {
    const isDataLoading = useStickersStore((state) => state.isDataLoading);
    const stickers = useStickersStore((state) => state.stickers);
    const [selectedInstance, setSelectedInstance] = useState<ISticker | null>(null);

    const stickerDrawerRef = useRef(false);

    const handleClickCreate = () => {
        stickerDrawerRef.current?.open();
    }

    const handleClickEdit = (item: ISticker) => {
        stickerDrawerRef.current?.open(item);
    };

    const handleClickDelete = (item: ISticker) => {
        console.log('view delete', item)
        setSelectedInstance(item);
        //confirmDeleteModalRef.current?.open();
    };

    const handleCancelDelete = () => {
        setSelectedInstance(null);
        //confirmDeleteModalRef.current?.close();
    };

    return <>
        <StickerDrawer ref={stickerDrawerRef}/>
        <div className={styles.stickersView}>
            <div className={styles.actionsPanel}>
                {
                    <BasicButton
                        Icon={AddIcon}
                        width="30px"
                        height="30px"
                        onClick={handleClickCreate}
                    />
                }
            </div>
            {stickers.length ?
                <div className={styles.stickersContainer}>
                    <div className={styles.stickersContainer__inner}>
                        {stickers.map((sticker) => (
                        <Sticker
                            key={sticker.id}
                            item={sticker}
                            editMode={editMode}
                            onClickDelete={handleClickDelete}
                            onClickEdit={handleClickEdit}
                            />
                        ))}
                    </div>
                </div>
            : ''}
            {(!stickers.length && !isDataLoading)  ?
                <div className={styles.noData}>
                    <div>
                        {editMode ? <>
                            { lang.thereIsNoStickersYetLetsAdd[0] }<br />
                            { lang.thereIsNoStickersYetLetsAdd[1] }
                        </>
                        :
                        <> { lang.thereIsNoStickersYet }</>
                        }
                        <BasicButton
                            Icon={AddIcon}
                            v-if="editMode"
                            width="50px"
                            height="50px"
                            onClick={handleClickCreate}
                        />
                    </div>
                </div>
            : ''}
        </div>
    </>
}