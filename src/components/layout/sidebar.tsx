"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    FileText,
    Home,
    Menu,
    PillIcon,
    Shield,
    StarsIcon,
    UserIcon,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
    className?: string;
}

interface SidebarItem {
    title: string;
    icon: React.ReactNode;
    href: string;
}

const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        icon: <Home className="h-5 w-5" />,
        href: "/user/dashboard",
    },
    {
        title: "Appointments",
        icon: <Calendar className="h-5 w-5" />,
        href: "/user/appointments",
    },
    {
        title: "Medical Records",
        icon: <FileText className="h-5 w-5" />,
        href: "/user/records",
    },
    {
        title: "Prescriptions",
        icon: <PillIcon className="h-5 w-5" />,
        href: "/user/prescriptions",
    },
    {
        title: "Chat with AI",
        icon: <StarsIcon color="#4caae0" className="h-5 w-5" />,
        href: "/user/chatbot",
    },
    {
        title: "Insurance",
        icon: <Shield className="h-5 w-5" />,
        href: "/user/insurance",
    },
    {
        title: "Profile",
        icon: <UserIcon className="h-5 w-5" />,
        href: "/user/profile",
    },
    {
        title: "Connect",
        icon: <Users className="h-5 w-5" />,
        href: "/user/connect",
    },
];

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const SidebarContent = (
        <div className="flex h-full flex-col gap-2 ">
            <div className="pl-3 py-2">
                <h2 className="text-lg font-semibold">HealthSync</h2>
                <p className="text-sm text-muted-foreground">Your Health Dashboard</p>
            </div>
            <div className="flex-1">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted text-muted-foreground"
                            )}
                        >
                            {item.icon}
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar (Sheet) */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="flex md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
                    {SidebarContent}
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden border-r bg-background md:flex md:w-[240px] md:flex-col",
                    className
                )}
            >
                {SidebarContent}
            </div>
        </>
    );
} 