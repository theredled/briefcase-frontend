import type {Metadata} from "next";
import "./globals.css";
import Link from "next/dist/client/link";
import {isLoggedIn, logout} from "@/lib/auth";


export const metadata: Metadata = {
    title: "Briefcase",
    description: "Briefcase, file sharing. Share your files from everywhere.",
    icons: ["/favicon.ico"]
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>{children} </>
    );
}