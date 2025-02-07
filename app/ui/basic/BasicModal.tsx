import React, {ReactNode, useImperativeHandle, useState} from "react";
import {createPortal} from "react-dom";
import styles from "@/app/ui/basic/BasicModal.module.scss";
import {BasicButton} from "@/app/ui/basic/BasicButton";
import {lang} from "@/lang";

interface Props {
  title: string;
  text: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  ref: React.RefObject<any>;
}

export const BasicModal = ({ title, text, onClickCancel, onClickConfirm, ref}: Props) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleClickCancel = () => {
    if (typeof onClickCancel === 'function') {
      onClickCancel();
    }
  }

  const handleClickConfirm = () => {
    if (typeof onClickConfirm === 'function') {
      onClickConfirm();
    }
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
      visible && <div className={styles.basicModal}>
          <div className={styles.basicModalInner}>
            <div className={styles.title}>
              { title }
            </div>
            <div className={styles.body}>
              { text }
            </div>
            <div className={styles.actions}>
              <BasicButton label={lang.cancel} onClick={handleClickCancel} />
              <BasicButton
              label={lang.confirm}
              onClick={handleClickConfirm}
              primary
              />
            </div>
          </div>
      </div> as ReactNode,
      document.body
  )
}