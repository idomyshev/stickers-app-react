'use client'

import styles from "./BasicTabs.module.scss";
import Link from "next/link";
import {ITab} from "@/types";
import classNames from "classnames";
import {useMemo} from "react";
import { usePathname } from "next/navigation";

interface Props {
    items: ITab[];
}

export const BasicTabs = ({items}: Props) => {
    const pathname = usePathname();
    const currentTabName = useMemo<string>(() => {
        // This is simplified case when the tab name is equal to the route name.
        return pathname;
    }, [pathname]);

    return (
        <div className={styles.basicTabs}>
            {items.map((tab) => (

                <Link href={{pathname: tab.pathName}}
                      key={tab.pathName}
                      className={classNames([
                          styles.tab,
                          currentTabName === tab.pathName && styles.tabActive
                      ] as any)}
                >
                    { tab.label }
                </Link>
            ))}
        </div>
    )
};