"use client";

import useApp from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Product from "@/components/Product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Comment from "@/components/Comment";

function Shop() {
  const { uniqueUrl }: { uniqueUrl: string } = useParams();
  const { fetchShop, addComment } = useApp();
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ["shop", uniqueUrl],
    queryFn: async () => {
      const res = await fetchShop(uniqueUrl);
      return res;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  const handleAddComment = async () => {
    setIsAdding(true)
    const commentData = { shopId: data?.id, text };
    await addComment(commentData);
    setText("")
    setIsAdding(false)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 space-y-6">
        <Skeleton className="h-40 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <Skeleton className="h-6 w-60" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-5 flex flex-col">
      <div className="p-3">
        {data?.banner && (
          <div className="relative w-[640px] h-[300px] rounded-lg overflow-hidden border shadow-lg">
            <Image
              src={data.banner}
              alt="Shop Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {data?.logo && (
              <div className="absolute bottom-4 left-4">
                <Image
                  src={data.logo}
                  alt="Shop Logo"
                  width={80}
                  height={80}
                  className="rounded-lg border shadow-md"
                />
              </div>
            )}
          </div>
        )}
        <div className="px-4 py-5  break-words">
          <h1 className="font-semibold text-2xl">{data?.name}</h1>
          <p className="text-gray-500 break-words">{data?.description}</p>
        </div>
      </div>
      <Tabs defaultValue="products" className="w-full py-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          {data?.products && data?.products?.length > 0 ? (
            <div className="py-5 px-5">
              <div className="grid grid-cols-4">
                {data?.products.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No products available</p>
          )}
        </TabsContent>
        <TabsContent value="comments">
          <div className="flex gap-2 py-4 items-center">
            <Input type="text" placeholder="Share your feedback" className="py-5" onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleAddComment} disabled={isAdding}>
              {isAdding ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <ArrowUp />
              )}
            </Button>

          </div>

          <div>
            {data?.comments && data?.comments?.length > 0 ? (
              <div className="py-5 px-5">
                <div>
                  {data?.comments.map((comment) => (
                    <Comment key={comment?.id} comment={comment}/>

                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No comments available</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="upvotes">
          <h1>upvotes</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Shop;
