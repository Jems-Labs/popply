import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ShopCategories } from '@/lib/ShopCategories';
import useApp from '@/stores/useApp';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Shop() {
  const { uniqueUrl } = useParams() as { uniqueUrl: string };
  const { manageshop, updateShop } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  useEffect(() => {
    if (manageshop) {
      setFormData({
        name: manageshop.name || "",
        description: manageshop.description || "",
        category: manageshop.category || "",
      });
    }
  }, [manageshop]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  // Save changes
  const handleSave = async () => {
    setIsLoading(true)
    await updateShop(uniqueUrl, formData);
    setIsLoading(false)
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="font-semibold text-2xl">Shop Information</p>
        <p className="text-lg text-gray-500">Update your shop details</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-lg">Shop Name</Label>
          <Input name="name" value={formData.name} type="text" onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="uniqueUrl" className="text-lg">Shop URL</Label>
          <div className="flex items-center">
            <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground border border-r-0 border-input">
              localhost:3000/s/
            </span>
            <Input
              id="uniqueUrl"
              name="uniqueUrl"
              value={manageshop?.uniqueUrl}
              className="rounded-l-none w-80"
              placeholder="my-shop"
              disabled />
          </div>
        </div>

        <div>
          <Label className="text-lg">Shop Description</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <Label className="text-lg">Shop Category</Label>
          <Select value={formData.category} onValueChange={handleCategoryChange}>
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

        <Button onClick={handleSave} disabled={isLoading}>{isLoading ? "saving..." : "Save Changes"}</Button>
      </div>
    </div>
  );
}

export default Shop;
