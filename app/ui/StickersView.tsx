import styles from './StickersView.module.scss';
import { BasicButton } from "@/app/ui/basic/BasicButton";
import { ISticker } from "@/types";
import { Sticker } from "@/app/ui/Sticker";
import AddIcon from "@/app/ui/icons/icons/AddIcon";
import { useStickersStore } from "@/store/stickersStore";
import { lang } from "@/lang";
import {BasicDrawer} from "@/app/ui/basic/BasicDrawer";
import {useRef} from "react";


export const StickersView = ({editMode, stickers}: {editMode: boolean, stickers: ISticker[]}) => {
    const isDataLoading = useStickersStore((state) => state.isDataLoading);
    const stopDataLoading = useStickersStore((state) => state.stopDataLoading);

    const drawerRef = useRef(false);

    const handleClickCreate = () => {
        console.log('create');
        drawerRef.current?.open();
    }

    return <>
        <BasicDrawer ref={drawerRef}/>
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
                            // @click:delete="handleClickDelete"
                            // @click:edit="handleClickEdit"
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