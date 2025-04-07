"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApp from "@/stores/useApp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(formData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (user) {
      router.push("/pop-mart");
    }
  }, [user]);
  return (
    <div className="border rounded-xl p-6 w-96 mx-auto mt-10 shadow-lg">
      <h1 className="text-2xl mb-6 text-center">
        Signup & Create your profile
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="eg. John doe"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "loading...." : "Signup"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?
        <Link
          href="/login"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
