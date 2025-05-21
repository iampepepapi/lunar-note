"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { SidebarTrigger } from "./ui/sidebar";

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showHeader = !pathname.startsWith("/dashboard");

    return (
        <div className=" min-h-screen w-full ">


            {showHeader && <Header />}

            <main className="flex flex-1 flex-col">{children}</main>

        </div >
    );
}