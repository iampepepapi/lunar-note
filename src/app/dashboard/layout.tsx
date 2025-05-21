import { AppSidebar } from "@/components/AppSidebra";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";


export default async function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <>

            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <main className="w-full h-full">{children}</main>
            </SidebarProvider>
        </>
    )
}