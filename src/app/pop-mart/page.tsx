"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import useApp from "@/stores/useApp";
import { ShopType } from "@/lib/types";
import { ShopCategories } from "@/lib/ShopCategories";
import { ArrowBigUp, Clock4, Tag } from "lucide-react";
import Link from "next/link";
import { calculateDaysLeft } from "@/lib/utils";

function PopMart() {
  const { fetchOpenShops, upvoteShop, user } = useApp();

  const { data, isLoading, refetch } = useQuery<ShopType[]>({
    queryKey: ["open-shops"],
    queryFn: async () => {
      const res = await fetchOpenShops();
      return res;
    },
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });

  const handleUpvote = async (shopId: number) => {
    await upvoteShop(shopId);
    refetch();
  };

  if (isLoading)
    return (
      <div className="py-20 px-10">
        <div className="mb-10 text-center space-y-2">
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
        <div className="my-3 flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 border rounded-xl justify-between"
            >
              <div className="flex gap-3 items-center">
                <Skeleton className="w-20 h-20 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-60" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="py-20 px-10">
      <h1 className="text-xl font-medium">Top Open Shops</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Discover the most popular shops that are currently open and trending in pop mart.
      </p>
      <div className="my-3 flex flex-col gap-4">
        {data?.length === 0 ? (
          <div className="text-gray-500 px-5">No Shops Found</div>
        ) : (
          data?.map((shop: ShopType) => {
            const category = ShopCategories.find(
              (c) => c.data === shop.category
            );
            const alreadyUpvoted = shop.upvotes.some(
              (upvote) => upvote.userId === user?.id
            );
            const daysLeft = calculateDaysLeft(shop.expiresAt);
            return (
              <div
                key={shop.id}
                className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition justify-between hover:bg-[#111111]"
              >
                <Link
                  className="flex gap-3 items-center"
                  href={`/s/${shop?.uniqueUrl}`}>
                  <Avatar className="w-20 h-20 rounded-md">
                    <AvatarImage src={shop.logo} alt={shop.name} />
                    <AvatarFallback>{shop.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold hover:underline">
                      {shop.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {shop.description.split(" ").length > 3
                        ? shop.description.split(" ").slice(0, 3).join(" ") +
                        "..."
                        : shop.description}
                    </p>

                    <div className="flex gap-2 items-center">
                      <p className="text-xs font-medium flex items-center gap-1 py-2 text-green-400">
                        <Clock4 size={12} />
                        {daysLeft} {daysLeft <= 1 ? "day left" : "days left"}
                      </p>
                      {category && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Tag size={12} />

                          <p className="text-sm">{category.label}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                <div
                  onClick={() => {
                    if (!alreadyUpvoted) handleUpvote(shop.id);
                  }}
                  className={`cursor-pointer flex items-center gap-2 border py-2 px-5 rounded-lg justify-center flex-col
                  ${alreadyUpvoted
                      ? "text-green-500 border-green-500 pointer-events-none opacity-50"
                      : "text-gray-400"
                    }`}
                >
                  <ArrowBigUp
                    className={` ${alreadyUpvoted ? "fill-green-500" : ""}`}
                  />
                  <span>{shop.upvotes.length}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div >
  );
}

export default PopMart;
