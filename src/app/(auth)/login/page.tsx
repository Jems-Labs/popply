
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
async function Login() {
  const session = await auth();
  if(session){
    redirect("/")
  }
  return (
    <div className="border rounded-xl p-6 w-96 mx-auto mt-10 shadow-lg">
      <h1 className="text-[#585858] text-center text-xl">Welcome Back!</h1>
      <h1 className="text-2xl mb-6 text-center">Login to your account</h1>

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
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500 underline hover:text-blue-700">
          Signup
        </Link>
      </p>
    </div>
  )
}

export default Login