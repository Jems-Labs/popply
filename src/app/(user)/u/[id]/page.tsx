"use client";

import useApp from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShopCategories } from "@/lib/ShopCategories";
import { ShopType } from "@/lib/types";
import { CalendarDays, ExternalLink, Tag } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function UserProfile() {
  const params = useParams();
  const id = params?.id as string;
  const { fetchPublicUser } = useApp();
  const parsedId = parseInt(id);

  const { data, isLoading } = useQuery({
    queryKey: ["public-user", id],
    queryFn: async () => await fetchPublicUser(parsedId),
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-6 py-20">
        <Card>
          <CardHeader className="flex gap-4 items-center">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="w-12 h-12 rounded-md" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  if (!data) return <div className="text-center mt-10">No user found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 py-20">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback>{data.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{data.name}</CardTitle>
              <p className="text-muted-foreground">{data.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            My Shops ({data.shops.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.shops.map((shop: ShopType) => {
            const category = ShopCategories.find(
              (c) => c.data === shop.category
            );
            return (
              <div
                key={shop.id}
                className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition"
              >
                <Avatar className="w-20 h-20 rounded-md">
                  <AvatarImage src={shop.logo} alt={shop.name} />
                  <AvatarFallback>{shop.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{shop.name}</h3>
                    <div className="flex gap-1">
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${shop.status === "open" &&
                          "bg-green-100 text-green-700 border-green-200"
                          } ${shop.status === "expired" &&
                          "bg-red-100 text-red-700 border-red-200"
                          } ${shop.status === "draft" &&
                          "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                      >
                        {shop.status}
                      </Badge>
                      <Link href={`/s/${shop?.uniqueUrl}`}>
                        <div className="border rounded-md p-2 cursor-pointer">
                          <ExternalLink size={15} />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {shop.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {category && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 text-xs"
                      >
                        <Tag size={12} /> {category.label}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-xs"
                    >
                      <CalendarDays size={12} />
                      {format(new Date(shop.launchDate), "dd MMM yyyy")}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfile;
