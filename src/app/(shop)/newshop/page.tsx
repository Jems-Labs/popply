"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CloudUpload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { ShopCategories } from "@/lib/ShopCategories";
import useApp from "@/stores/useApp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

function Newshop() {
    const logoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const { createShop } = useApp()
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        uniqueUrl: ""
    });
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return;
            }
            setFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setPreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const clearLogoPreview = () => {
        setLogoFile(null);
        setLogoPreview(null);
    };

    const clearBannerPreview = () => {
        setBannerFile(null);
        setBannerPreview(null);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.category || !formData.uniqueUrl || !logoFile || !bannerFile) {
            return toast.error("All fields are required");
        }
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("uniqueUrl", formData.uniqueUrl);
        if (logoFile) data.append("logo", logoFile);
        if (bannerFile) data.append("banner", bannerFile);
        setIsLoading(true);
        const res = await createShop(data)
        if (res.uniqueUrl) {
            router.push(`/s/${res.uniqueUrl}/dashboard`);
        }

        setIsLoading(false)
    };

    return (
        <div>
            <div className="py-20 px-10 relative">
                <div className="flex gap-4 items-center">
                    <Button onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <p className="font-semibold text-2xl">New Popup Shop</p>
                </div>
                <p className="text-lg text-gray-500 mt-2">Fill out the details to save your new popup shop</p>
                <form className="my-5">
                    <div className="py-4">
                        <Label className="text-lg">Shop Name</Label>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="My Amazing Shop" className="w-80 text-xl" />
                    </div>
                    <div>
                        <Label className="text-lg">Description</Label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} className="w-80" placeholder="Tell customers about your shop" />
                    </div>
                    <div className="py-4">
                        <Label className="text-lg">Shop Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {ShopCategories.map((category, index) => (
                                        <SelectItem value={category.data} key={index}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="uniqueUrl" className="text-lg">Shop URL</Label>
                        <div className="flex items-center">
                            <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground border border-r-0 border-input">
                                popply.netlify.app/s/
                            </span>
                            <Input id="uniqueUrl" name="uniqueUrl" value={formData.uniqueUrl} onChange={handleChange} className="rounded-l-none w-80" placeholder="my-shop" required />
                        </div>
                    </div>

                    <div className="py-4 flex flex-col">
                        <Label className="text-lg">Shop Logo</Label>
                        <input type="file" ref={logoInputRef} className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(e, setLogoFile, setLogoPreview)} />
                        <div className="flex items-center gap-4">
                            <Button className="w-32" type="button" onClick={() => logoInputRef.current?.click()}>
                                <CloudUpload /> Upload a file
                            </Button>
                            {logoPreview && (
                                <div className="relative">
                                    <img src={logoPreview} alt="Logo Preview" className="w-16 h-16 rounded-md object-cover border" />
                                    <button className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full" onClick={clearLogoPreview}>
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <Label className="text-lg">Shop Banner</Label>
                        <input type="file" ref={bannerInputRef} className="hidden" accept="image/png, image/jpeg" onChange={(e) => handleImageUpload(e, setBannerFile, setBannerPreview)} />
                        <div className="flex items-center gap-4">
                            <Button className="w-32" type="button" onClick={() => bannerInputRef.current?.click()}>
                                <CloudUpload /> Upload a file
                            </Button>
                            {bannerPreview && (
                                <div className="relative">
                                    <img src={bannerPreview} alt="Banner Preview" className="w-32 h-16 rounded-md object-cover border" />
                                    <button className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full" onClick={clearBannerPreview}>
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                <Separator />
                <Button onClick={handleSubmit} disabled={isLoading} className="my-5">{isLoading ? "saving...." : "Save Shop"}</Button>
            </div>
            
                
        </div>
    );
}

export default Newshop;