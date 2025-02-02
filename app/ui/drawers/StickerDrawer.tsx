import {BasicDrawer} from "@/app/ui/basic/BasicDrawer";
import {useImperativeHandle, useMemo, useRef, useState} from "react";
import {lang} from "@/lang";
import {ISticker, IStickerForm} from "@/types";

const initialDrawerState = {
    text: "",
};

export const StickerDrawer = ({ref}) => {
    const basicDrawerRef = useRef<boolean>(false);
    const [instanceId, setInstanceId] = useState<string>(null);
    const [currentDrawerState, setCurrentDrawerState] = useState<IStickerForm>({
        ...initialDrawerState,
    });
    const [savedDrawerState, setSavedDrawerState] = useState<IStickerForm>({
        ...initialDrawerState,
    });

    const isValid = useMemo<boolean>(() => {
        return Object.values(currentDrawerState).every((value) => {
            return typeof value === "string" ? value.trim() : true;
        });
    }, [currentDrawerState]);

    const isChanged = useMemo<boolean>(() => {
        return Object.entries(currentDrawerState).some(([key, value]) => {
            return typeof value === "string"
                ? value.trim() !== savedDrawerState[key as keyof IStickerForm]
                : true;
        });
    }, [currentDrawerState, savedDrawerState]);


    useImperativeHandle(ref, () => ({
        open: (item?: ISticker) => {
            // if (item) {
            //     const { id, ...form } = item;
            //     setInstanceId(id);
            //     setCurrentDrawerState(form);
            //     setSavedDrawerState(form);
            // }

            basicDrawerRef.current?.open();
        },
    }));

    const reinitializeDrawerData = () => {
        setInstanceId(null);
        setCurrentDrawerState({ ...initialDrawerState });
        setSavedDrawerState({ ...initialDrawerState });
    };

    const closeDrawer = () => {
        basicDrawerRef.current?.close();
        reinitializeDrawerData();
    };


    const handleClickCancel = () => {
        if (isChanged) {
            //confirmDiscardModalRef.value?.open();
        } else {
            closeDrawer();
        }
    };

    const handleAction = () => {
        // Trim string values before save.
        Object.entries(currentDrawerState).forEach(([key, value]) => {
            if (typeof value === "string") {
                currentDrawerState[key as keyof IStickerForm] = value.trim();
            }
        });

        if (instanceId) {
            console.log('edit')
            //editSticker({ id: instanceId.value, ...currentDrawerState });
        } else {
            console.log('add')
            //addSticker({ ...currentDrawerState });
        }

        closeDrawer();
    };


    return <BasicDrawer
        ref={basicDrawerRef}
        title={instanceId ? lang.editSticker : lang.createSticker}
        actionButtonLabel={instanceId ? lang.update : lang.create}
        actionDisabled={!isValid}
        onClickCancel={handleClickCancel}
        onClickAction={handleAction}
    >
        BasicTextArea
    </BasicDrawer>
}
