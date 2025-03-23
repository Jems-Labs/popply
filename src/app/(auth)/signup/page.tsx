import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Signup() {
  const session = await auth();
  if (session) {
    redirect("/")
  }
  return (
    <div className="border rounded-xl p-6 w-96 mx-auto mt-10 shadow-lg">
      <h1 className="text-2xl mb-6 text-center">Signup & Create your profile</h1>
      <form action={async () => {
        "use server"
        await signIn("google");
      }}>
        <Button className="w-full flex items-center justify-center gap-2  borderrounded-lg py-2">
          <Image
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            width={24}
            height={24}
          />
          Continue with Google
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline hover:text-blue-700">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
