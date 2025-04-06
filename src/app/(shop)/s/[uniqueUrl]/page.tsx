"use client";

import useApp from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Product from "@/components/Product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ArrowBigUp, ArrowUp, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Comment from "@/components/Comment";
import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

function Shop() {
  const { uniqueUrl }: { uniqueUrl: string } = useParams();
  const { fetchShop, addComment, user, upvoteShop } = useApp();
  const [text, setText] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["shop", uniqueUrl],
    queryFn: async () => {
      const res = await fetchShop(uniqueUrl);
      return res;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });

  // shop view
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (data?.id) {
      const addView = async () => {
        const viewData = { shopId: data?.id };
        await axios.post("/api/shop/view", viewData);
      };

      addView();
    }
  }, [user, data?.id]);

  const handleAddComment = async () => {
    setIsAdding(true);
    const commentData = { shopId: data?.id, text };
    await addComment(commentData);
    setText("");
    setIsAdding(false);
  };

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
  const alreadyUpvoted = data?.upvotes.some(
    (upvote) => upvote.userId === user?.id
  );

  if (data?.status === "expired") {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] text-center px-4">
        <Image
          src={data?.logo}
          alt="logo"
          width={200}
          height={200}
          className="mb-6"
        />
        <h2 className="text-2xl font-semibold mb-2">{data?.name} is closed!</h2>
        <p className="text-muted-foreground max-w-md">
          This shop is no longer active or has been closed by the owner. Check
          out other awesome shops on our platform!
        </p>

        <Button onClick={() => router.push("/pop-mart")} className="mt-6">
          Explore More Shops
        </Button>
      </div>
    );
  }
  return (
    <div className="py-20 px-5 flex flex-col">
      <div className="flex justify-between">
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

          <div className="px-4 py-5 break-words">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-2xl">{data?.name}</h1>

              <div className="mt-4">
                <div
                  className={`
                          inline-block px-3 py-1 rounded-full text-xs font-medium
                          ${
                            data?.status === "open"
                              ? "bg-green-500/10 text-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                              : data?.status === "expired"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                >
                  {data?.status === "open"
                    ? "Open"
                    : data?.status === "expired"
                    ? "Closed"
                    : "Draft"}
                </div>
              </div>
            </div>

            <p className="text-gray-500 break-words">{data?.description}</p>

            <div className="py-5">
              <h1 className="text-sm text-gray-500">Shop By</h1>
              <div className="border p-1 rounded-lg w-36">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback>{data?.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <Link href={`/u/${data?.owner.id}`}>
                    <h1 className="text-sm underline">{data?.owner.name}</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (!alreadyUpvoted) upvoteShop(data?.id);
          }}
          className={`cursor-pointer flex items-center gap-2 border py-2 px-5 rounded-lg justify-center flex-col
                  ${
                    alreadyUpvoted
                      ? "text-green-500 border-green-500 pointer-events-none opacity-50"
                      : "text-gray-400"
                  } h-20`}
        >
          <ArrowBigUp
            className={` ${alreadyUpvoted ? "fill-green-500" : ""}`}
          />
          <span>{data?.upvotes.length}</span>
        </div>
      </div>
      <Tabs defaultValue="products" className="w-full py-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products" className="text-xl">
            Products <Dot /> {data?.products.length}
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-xl">
            Comments <Dot /> {data?.comments.length}
          </TabsTrigger>
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
          <div className="flex gap-2 py-4 items-center px-5">
            <Input
              type="text"
              placeholder="Share your feedback"
              className="py-5"
              onChange={(e) => setText(e.target.value)}
            />
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
                    <Comment key={comment?.id} comment={comment} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No comments available</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Shop;
