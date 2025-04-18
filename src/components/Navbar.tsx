"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

import ProfilePopover from "./ProfilePopover";
import { Rocket, Plus } from "lucide-react";
import useApp from "@/stores/useApp";
import { useEffect } from "react";

function Navbar() {
  const { fetchUser, user } = useApp();
  useEffect(() => {
    fetchUser()
  }, []);
  return (
    <nav className="w-full fixed top-0 left-0 right-0 px-6 py-2 border-b flex items-center justify-between z-50 bg-dark/50 backdrop-blur-md">
      <Link className="cursor-pointer" href={"/"}>
        <Image src="/popply-nobg.png" alt="logo" width={120} height={60} />
      </Link>
      <div>
        <Link
          href="/pop-mart"
          className="px-5 py-3 text-[15px] flex items-center gap-3 hover:underline"
        >
          <Rocket className="w-5 h-5" />
          <span>Pop Mart</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link href={"/newshop"}>
              <Button>
                <Plus />
                <span>New Shop</span>
              </Button>
            </Link>
            <div>
              <ProfilePopover name={user?.name} />
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
