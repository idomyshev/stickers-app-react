'use client'

import {createPortal} from "react-dom";
import {ReactNode, useImperativeHandle, useRef, useState} from "react";
import styles from './BasicDrawer.module.scss';
import {CSSTransition} from "react-transition-group";

export const BasicDrawer = ({ref}) => {
    const [visible, setVisible] = useState(false);
    const nodeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));

    return createPortal(
        <CSSTransition in={visible} timeout={300} classNames={{
            enter: styles.drawerEnter,
            enterActive: styles.drawerEnterActive,
            exit: styles.drawerExit,
            exitActive: styles.drawerExitActive
                }}
               unmountOnExit
               nodeRef={nodeRef}>
            <div className={styles.basicDrawer} ref={nodeRef}>
                <div className={styles.basicDrawerInner}>
                    Basic Drawer
                </div>
            </div>
        </CSSTransition> as ReactNode,

        document.body
    )
}