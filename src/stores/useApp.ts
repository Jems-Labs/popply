import { useAppType } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
const useApp = create<useAppType>((set) => ({
  user: null,
  myShops: [],
  manageshop: null,
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
    } catch (error) {
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
    } catch (error) {
      toast.success("Failed to save");
    }
  },
  fetchMyShops: async () => {
    try {
      const res = await axios.get("/api/my-shops");
      if (res.status === 200) {
        set({ myShops: res.data });
      }
    } catch (error) {
      set({ myShops: [] });
    }
  },
  fetchManageShop: async (url) => {
    try {
      const res = await axios.get(`/api/shop/manage?url=${url}`);
      if (res.status === 200) {
        set({ manageshop: res.data });
      }
    } catch (error) {
      set({ manageshop: null });
    }
  },
  updateShop: async (url, formData) => {
    try {
      const res = await axios.put(`/api/shop/manage?url=${url}`, formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error("Failed to update shop");
    }
  },
  addProduct: async (id, formData) => {
    try {
      const res = await axios.post(`/api/product?id=${id}`, formData);
      if (res.status === 200) {
        toast.success("Product Added");
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
  },
  fetchProducts: async (id) => {
    try {
      const res = await axios.get(`/api/shop/products?id=${id}`);
      if (res.status === 200) {
        return res.data || [];
      }
    } catch (error) {
      return [];
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axios.delete(`/api/product?id=${id}`);
      if(res.status === 200){
        toast.success(res.data.msg)
      }
    } catch (error) {
      toast.error("Failed to delete product")
    }
  }
}));
export default useApp;
