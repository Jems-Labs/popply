"use client"
import useApp from '@/stores/useApp'
import React from 'react'
import Shop from './_components/Shop';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

function MyShops() {
    const { fetchMyShops, user } = useApp();
    const router = useRouter()
    const { data: myShops } = useQuery({
        queryKey: ["myShops", user?.id],
        queryFn: async () => {
            const res = await fetchMyShops();
            return res;
        },
        retry: 1,
        staleTime: 1000 * 60 * 2,
    })

    return (
        <div className='py-20 px-10'>
            <div className="flex gap-4 items-center py-4">
                <Button onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <p className="font-semibold text-2xl">My Shops</p>
            </div>
            <div className='grid grid-cols-5 gap-3'>


                {myShops?.map((shop, index) => {
                    return (
                        <Shop logo={shop?.logo} name={shop?.name} uniqueUrl={shop?.uniqueUrl} key={index} category={shop?.category} />
                    )
                })}
            </div>
        </div>
    )
}

export default MyShops