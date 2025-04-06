"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

import ProfilePopover from "./ProfilePopover";
import {
  House,
  Rocket,
  Plus,
} from "lucide-react";
import useApp from "@/stores/useApp";
import { useEffect } from "react";

function Navbar() {
  const { fetchUser, user } = useApp();
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);
  return (
    <nav className="w-full fixed top-0 left-0 right-0 px-6 py-2 border-b flex items-center justify-between z-50 bg-dark/50 backdrop-blur-md">
      <div className="cursor-pointer">
        <Image src="/popply-nobg.png" alt="logo" width={120} height={60} />
      </div>
      <div>
        <ul className="flex items-center gap-4">
          <Link
            href="/home"
            className="px-5 py-3 text-[15px] flex items-center gap-3"
          >
            <House className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/pop-mart"
            className="px-5 py-3 text-[15px] flex items-center gap-3"
          >
            <Rocket className="w-5 h-5" />
            <span>Pop Mart</span>
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link href={'/newshop'}>
              <Button>
                <Plus />
                <span>New Shop</span>
              </Button>
            </Link>
            <div>
              <ProfilePopover name={user?.name}/>
            </div>
          </>
        ) : (
        <div className="flex items-center gap-2">
          <Link href={"/login"}>
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href={"/signup"}>
            <Button>Sign Up</Button>
          </Link>
        </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
