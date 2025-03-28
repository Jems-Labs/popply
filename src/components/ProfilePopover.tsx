"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { LogOut, Store, UserRound, ChevronsUpDown } from "lucide-react";
import useApp from "@/stores/useApp";



function ProfilePopover({ name }: { name: string }) {
    const { logout } = useApp();
    return (
        <Popover>
            <PopoverTrigger asChild className="cursor-pointer">
                <div className="border border-input bg-background rounded-md px-3 py-2 text-sm flex items-center justify-between cursor-pointer gap-3">
                    <span className="truncate">{name}</span>
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                </div>

            </PopoverTrigger>
            <PopoverContent className="w-48 py-2 px-4">
                <ul>
                    <Link
                        href={"/profile"}
                        className="px-4 py-3 text-base flex items-center gap-4 hover:bg-[#303030] transition rounded-md">
                        <UserRound className="w-5 h-5" />
                        Profile
                    </Link>
                    <Link
                        href={"/myshops"}
                        className="px-4 py-3 text-base flex items-center gap-4 hover:bg-[#303030] transition rounded-md">
                        <Store className="w-5 h-5" />
                        My Shops
                    </Link>

                    <li className="px-4 py-3 border-t hover:bg-[#303030] transition rounded-md">
                        <button className="text-base flex items-center gap-4 border-none" onClick={() => logout()}>
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default ProfilePopover