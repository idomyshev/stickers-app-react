import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/scss/main.scss";
import {BasicLoader} from "@/app/ui/basic/BasicLoader";
import {tabs} from "@/settings/tabs";
import {BasicTabs} from "@/app/ui/basic/BasicTabs";
import styles from './layout.module.scss';
import ClientWrapper from "@/app/ui/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stickers App (React, Next)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased` }
            >
                <div className={styles.appContainer}>
                <BasicTabs items={tabs} />
                {children}
                </div>
                <ClientWrapper/>
                <BasicLoader/>
            </body>
        </html>
    );
}
