import React from "react";
import classes from "./BasicButton.module.scss"

export default function BasicButton({ Icon, width = "20px", height = "20px" }: {
    Icon: any;
}) {
    return (
        <div
            className={`${classes.basicButton} ${classes.iconButton}`}

        >
            <Icon style={{width, height}} />
        </div>
    )
}