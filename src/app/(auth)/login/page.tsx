"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApp from "@/stores/useApp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useApp();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/pop-mart")
    }
  }, [user]);
  return (
    <div className="border rounded-xl p-6 w-96 mx-auto mt-10 shadow-lg">
      <h1 className="text-2xl mb-6 text-center">Login to your account</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="eg. johndoe@email.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="*****"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <Button type="submit" disabled={isLoading}>{isLoading ? "loading...." : "Login"}</Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
