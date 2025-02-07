import React from "react";
import styles from "./BasicButton.module.scss";
import classNames from "classnames";

interface Props {
    Icon?: any;
    onClick?: () => void;
    width?: string;
    height?: string;
    label?: string;
    disabled?: boolean;
    primary?: boolean;
}

export const BasicButton = ({ Icon, onClick, width = "20px", height = "20px", label, disabled, primary }: Props) => {

    const handleClick  = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    return (
        <div
            className={classNames([
                styles.basicButton,
                Icon && styles.iconButton,
                disabled && styles.disabled,
                primary && styles.primary
            ] as any)}
            onClick={handleClick}
        >
            {label}
            {Icon && <Icon style={{width, height}} />}
        </div>
    )
}