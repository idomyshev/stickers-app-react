import styles from './StickersView.module.scss';
import BasicButton from "@/app/ui/basic/BasicButton";
import {ISticker} from "@/types";
import {Sticker} from "@/app/ui/Sticker";
import AddIcon from "@/app/ui/icons/icons/AddIcon";


export const StickersView = ({editMode, stickers}: {editMode: boolean, stickers: ISticker[]}) => {
    return (
        <div className={styles.stickersView}>
        <div className={styles.actionsPanel}>
            {
                <BasicButton
                    Icon={AddIcon}
                    width="30px"
                    height="30px"
                    onClick="handleClickCreate"
                />
            }
        </div>
        {stickers.length &&
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
        }
        {/*<div v-else-if="!isDataLoading" className="no-data">*/}
        {/*    <div>*/}
        {/*        <template v-if="editMode">*/}
        {/*            {{ lang.thereIsNoStickersYetLetsAdd[0] }}<br />*/}
        {/*            {{ lang.thereIsNoStickersYetLetsAdd[1] }}*/}
        {/*        </template>*/}
        {/*        <template v-else> {{ lang.thereIsNoStickersYet }}</template>*/}
        {/*        <BasicButton*/}
        {/*            v-if="editMode"*/}
        {/*            width="50px"*/}
        {/*            height="50px"*/}
        {/*        :icon="AddIcon"*/}
        {/*        @click="handleClickCreate"*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
    )
}