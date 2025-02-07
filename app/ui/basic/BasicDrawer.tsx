'use client'

import {createPortal} from "react-dom";
import {ReactNode, useImperativeHandle, useState} from "react";
import styles from './BasicDrawer.module.scss';
import {BasicButton} from "@/app/ui/basic/BasicButton";
import {lang} from "@/lang";

interface Props {
    title: string;
    actionDisabled?: boolean;
    actionButtonLabel: string,
    onClickCancel: () => void;
    onClickAction: () => void;
    children: React.ReactNode;
    ref: React.RefObject<any>;
}

export const BasicDrawer = ({title, actionDisabled, actionButtonLabel, onClickCancel, onClickAction, children, ref }: Props) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));

    const handleClickCancel = () => {
        if (typeof onClickCancel === 'function') {
            onClickCancel();
        }
    };

    const handleClickAction = () => {
        if (!actionDisabled) {
            onClickAction();
        }
    };

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
visible &&
        <div className={styles.basicDrawer}>
            <div className={styles.basicDrawerInner}>
                <div className={styles.basicDrawerTitle}>{title}</div>
                <div className={styles.basicDrawerBody}>
                    {children}
                </div>
                <div className={styles.basicDrawerButtons}>
                    <BasicButton label={lang.cancel} onClick={handleClickCancel}/>
                    <BasicButton
                        label={actionButtonLabel}
                        disabled={actionDisabled}
                        onClick={handleClickAction}
                        primary
                    />
                </div>
            </div>
        </div> as ReactNode,
        document.body as any
    )
}