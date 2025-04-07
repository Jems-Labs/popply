"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApp from "@/stores/useApp";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Profile() {
  const { user, fetchUser } = useApp();

  useEffect(() => {
    fetchUser();
  }, []);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/user', formData);
      if (res.status === 200) {
        toast.success("Password Changed");
      }
    } catch {
      toast.error("Failed to change password");
    }

  }

  return (
    <div className="py-20 px-10">
      <div className="py-2">
        <h1 className="text-3xl font-semibold">My Profile</h1>
      </div>
      <div className="py-10 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-medium">Name</Label>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-44">Change Password</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="my-2">
              <DialogTitle className="text-2xl">Change Password</DialogTitle>
            </DialogHeader>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <Label>Current Password</Label>
                <Input type="password" placeholder="****" onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <Label>New Password</Label>
                <Input type="password" placeholder="****" onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />
              </div>
              <Button type="submit">Change</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Profile;
