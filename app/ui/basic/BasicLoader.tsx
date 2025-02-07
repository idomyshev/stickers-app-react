'use client'

import { useStickersStore } from "@/store/stickersStore";
import styles from './BasicLoader.module.scss';
import Image from "next/image";
import loaderImage from '@/images/loader.svg'

export const BasicLoader = () => {
    const isDataLoading = useStickersStore((state) => state.isDataLoading);

    return isDataLoading && <div className={styles.basicLoader}>
         <Image
             src={loaderImage}
             alt="loader"
             width={150}
             height={150}
         />
    </div>

}