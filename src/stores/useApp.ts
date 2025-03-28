import { useAppType } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
const useApp = create<useAppType>((set) => ({
  user: null,
  fetchUser: async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        set({ user: res.data });
      } else {
        set({ user: null });
      }
    } catch (error) {
      set({ user: null });
    }
  },
  signup: async (formData) => {
    try {
      const res = await axios.post("/api/signup", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.msg ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },
  login: async (formData) => {
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200) {
        toast.success("Logged In");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.msg ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  },
}));
export default useApp;
