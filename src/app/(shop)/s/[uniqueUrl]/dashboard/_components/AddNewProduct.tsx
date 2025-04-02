import React, { useRef, useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, X } from "lucide-react";
import useApp from "@/stores/useApp";

function AddNewProduct() {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        productUrl: "",
        image: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    const { manageshop, addProduct } = useApp();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setData((prev) => ({ ...prev, image: file }));
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        setData((prev) => ({ ...prev, image: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("productUrl", data.productUrl);
        if (data.image) {
            formData.append("image", data.image);
        }
        setIsLoading(true)
        await addProduct(manageshop?.id, formData);
        setIsLoading(false)
    };


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Enter product details below</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
                <div>
                    <Label>Product Image</Label>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <div className="flex items-center gap-4">
                        <Button className="w-32" type="button" onClick={triggerFileInput}>
                            <CloudUpload /> Upload Image
                        </Button>
                    </div>

                    {previewUrl && (
                        <div className="relative mt-3">
                            <img src={previewUrl} alt="Product Preview" className="w-16 h-16 rounded-md object-cover border" />
                            <button
                                className="absolute -top-2 left-12 bg-red-500 text-white p-1 rounded-full"
                                onClick={removeImage}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Wireless Bluetooth Headphones"
                        value={data.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="e.g. High-quality noise-canceling headphones with 40-hour battery life"
                        value={data.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label htmlFor="price">Price (INR)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="e.g. 2999"
                        value={data.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Label htmlFor="productUrl">Purchase URL</Label>
                    <Input
                        id="productUrl"
                        name="productUrl"
                        type="url"
                        placeholder="e.g. https://www.amazon.in/dp/B08XYZ1234"
                        value={data.productUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "adding..." : "Add"}</Button>
                </div>
            </div>
        </DialogContent>
    );
}

export default AddNewProduct;
