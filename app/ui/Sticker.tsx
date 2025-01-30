import classes from "./Sticker.module.scss";
import {ISticker} from "@/types";

export const Sticker = ({editMode, item}: {editMode: boolean, item: ISticker}) => {
    return <div className={classes.sticker}>
        {editMode && <div  className={classes["actions-buttons"]}>
            {/*<BasicButton*/}
            {/*icon="DeleteIcon"*/}
            {/*@click="emit('click:delete', { ...item })"*/}
            {/*/>*/}
            {/*<BasicButton :icon="EditIcon" @click="emit('click:edit', { ...item })" />*/}
        </div>}
        <div className={classes.sticker__inner}>
            {item.text}
        </div>
    </div>
}