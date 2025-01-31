import styles from "./Sticker.module.scss";
import {ISticker} from "@/types";
import BasicButton from "@/app/ui/basic/BasicButton";
import DeleteIcon from "@/app/ui/icons/icons/DeleteIcon";
import EditIcon from "@/app/ui/icons/icons/EditIcon";

export const Sticker = ({editMode, item}: {editMode: boolean, item: ISticker}) => {
    const handleEdit = () => {
        console.log("edit", item)
    }

    const handleDelete = () => {
        console.log("delete", item)
    }

    return <div className={styles.sticker}>
        {editMode && <div  className={styles.actionsButtons}>
            <BasicButton
                Icon={DeleteIcon}
                onClick={handleDelete}
            />
            <BasicButton
                Icon={EditIcon}
                onClick={handleEdit}
                />
        </div>}
        <div className={styles.sticker__inner}>
            {item.text}
        </div>
    </div>
}