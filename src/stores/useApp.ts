import { useAppType } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
const useApp = create<useAppType>((set) => ({
  user: null,
  manageshop: null,
  fetchUser: async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        set({ user: res.data });
      } else {
        set({ user: null });
      }
    } catch {
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
        set({ user: res.data });
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
  logout: async () => {
    try {
      const res = await axios.post("/api/logout", {});
      if (res.status === 200) {
        set({ user: null });
        toast.success("Logged Out");
      }
    } catch {
      toast.error("Failed to logout");
    }
  },
  createShop: async (formData) => {
    try {
      const res = await axios.post("/api/shop", formData);
      if (res.status === 200) {
        toast.success("Saved");
        return res.data;
      }
    } catch {
      toast.error("Failed to save");
    }
  },
  fetchMyShops: async () => {
    try {
      const res = await axios.get("/api/my-shops");
      if (res.status === 200) {
        return res.data || [];
      }
    } catch {
      return [];
    }
  },
  fetchManageShop: async (url) => {
    try {
      const res = await axios.get(`/api/shop/manage?url=${url}`);
      if (res.status === 200) {
        set({ manageshop: res.data });
      }
    } catch {
      set({ manageshop: null });
    }
  },
  updateShop: async (url, formData) => {
    try {
      const res = await axios.put(`/api/shop/manage?url=${url}`, formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch {
      toast.error("Failed to update shop");
    }
  },
  addProduct: async (id, formData) => {
    try {
      const res = await axios.post(`/api/product?id=${id}`, formData);
      if (res.status === 200) {
        toast.success("Product Added");
      }
    } catch {
      toast.error("Failed to add product");
    }
  },
  fetchProducts: async (id) => {
    try {
      const res = await axios.get(`/api/shop/products?id=${id}`);
      if (res.status === 200) {
        return res.data || [];
      }
    } catch {
      return [];
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axios.delete(`/api/product?id=${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch {
      toast.error("Failed to delete product");
    }
  },
  fetchShop: async (url) => {
    try {
      const res = await axios.get(`/api/shop?url=${url}`);
      if (res.status === 200) {
        return res.data || null;
      }
    } catch {
      return null;
    }
  },
  addComment: async (data) => {
    try {
      const res = await axios.post("/api/shop/comment", data);
      if (res.status === 200) {
        toast.success("Commented");
      }
    } catch {
      toast.error("Failed to add comment");
    }
  },
  launchShop: async (id) => {
    try {
      const res = await axios.put(`/api/launch?id=${id}`);
      if (res.status === 200) {
        toast.success("Launched");
      }
    } catch {
      toast.error("Failed to launch this shop");
    }
  },
  fetchPublicUser: async (id) => {
    try {
      const res = await axios.get(`/api/get-user?id=${id}`);

      if (res.status === 200) {
        return res.data;
      }
    } catch {
      return null;
    }
  },
  fetchOpenShops: async () => {
    try {
      const res = await axios.get("/api/shops");
      if (res.status === 200) {
        return res.data || [];
      }
    } catch {
      return [];
    }
  },
  upvoteShop: async (shopId) => {
    try {
      const res = await axios.post(`/api/shop/upvote?id=${shopId}`);
      if (res.status === 200) {
        toast.success("Upvoted");
      }
    } catch {
      toast.error("Failed to upvote");
    }
  },
}));
export default useApp;
