"use client"
import useApp from '@/stores/useApp'
import React, { useEffect } from 'react'
import Shop from './_components/Shop';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function MyShops() {
    const { fetchMyShops, myShops, user } = useApp();
    const router = useRouter()
    useEffect(() => {
        fetchMyShops();
    }, [user, fetchMyShops]);

    return (
        <div className='py-20 px-10'>
            <div className="flex gap-4 items-center py-4">
                <Button onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <p className="font-semibold text-2xl">My Shops</p>
            </div>
            <div className='grid grid-cols-5 gap-3'>


                {myShops.map((shop, index) => {
                    return (
                        <Shop logo={shop?.logo} name={shop?.name} uniqueUrl={shop?.uniqueUrl} key={index} category={shop?.category} />
                    )
                })}
            </div>
        </div>
    )
}

export default MyShops