import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full fixed top-0 left-0 right-0 px-6 md:px-10 py-2 border-b flex items-center justify-between z-50 bg-dark/50 backdrop-blur-md">
      <div className="cursor-pointer">
        <Image src="/popply-nobg.png" alt="logo" width={120} height={60} />
      </div>

      {session?.user ? (
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            method="POST"
          >
            <Button>Logout</Button>
          </form>
        </div>
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
    </nav>
  );
}

export default Navbar;
