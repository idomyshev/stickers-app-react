import React from "react";
import styles from "./BasicButton.module.scss";
import classNames from "classnames";

interface ComponentProps {
    Icon?: any;
    onClick?: () => void;
    width?: string;
    height?: string;
    label?: string;
    disabled?: boolean;
    primary?: boolean;
}

export const BasicButton = ({ Icon, onClick, width = "20px", height = "20px", label, disabled, primary }: ComponentProps) => {
    const handleClick  = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    return (
        <div
            className={classNames(styles.basicButton, {
                [styles.iconButton]: Icon,
                [styles.disabled]: disabled,
                [styles.primary]: primary
            })}
            onClick={handleClick}
        >
            {label && label}
            {Icon && <Icon style={{width, height}} />}
        </div>
    )
}