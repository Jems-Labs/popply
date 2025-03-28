"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApp from "@/stores/useApp";
import { useEffect } from "react";

function Profile() {
  const { user, fetchUser } = useApp();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="py-20 px-10">
      <div className="py-5">
        <h1 className="text-3xl font-semibold">My Profile</h1>
      </div>
      <div className="py-4 border-b">
        <Avatar className="w-32 h-auto">
          <AvatarImage src={user?.image || ""} className="rounded-full" />
        </Avatar>
      </div>
      <div className="py-10 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-medium">Username</Label>
          <Input
            className="text-lg px-4 py-3"
            value={user?.name ?? ""}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-medium">Email</Label>
          <Input
            className="text-lg px-4 py-3"
            value={user?.email ?? ""}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
