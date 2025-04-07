"use client";
import React, { useEffect, useState } from 'react';
import DashboardSidebar from './_components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Link2, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Analytics from './_components/Analytics';
import Products from './_components/Products';
import Shop from './_components/Shop';
import useApp from '@/stores/useApp';
import { toast } from 'sonner';
function DashboardPage() {
    const { uniqueUrl }: { uniqueUrl: string } = useParams();
    const [tab, setTab] = useState("analytics");
    const { fetchManageShop, user, launchShop, manageshop } = useApp();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const renderComponent = () => {
        switch (tab) {
            case "shop":
                return <Shop />;
            case "products":
                return <Products />;
            case "analytics":
                return <Analytics />;
            default:
                return <Analytics />;
        }
    };



    useEffect(() => {
        if (!user) {
            router.push("/login")
        };
        fetchManageShop(uniqueUrl);
    }, [user, fetchManageShop, uniqueUrl]);

    useEffect(() => {
        if (manageshop && user && manageshop.ownerId !== user.id) {
            router.push('/pop-mart');
        }
    }, [manageshop, user, router]);

    const handleLaunchShop = async () => {
        setIsLoading(true);
        await launchShop(manageshop?.id);
        setIsLoading(false)
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/s/${manageshop?.uniqueUrl}`);
            toast.success("Copied Link")
        } catch {
            toast.error("Failed to copy link")
        }
    };
    return (
        <div className='py-20 px-10'>
            <div className='flex justify-between items-center'>
                <div className="flex gap-4 items-center">
                    <Button>
                        <ArrowLeft />
                    </Button>
                    <p className="font-semibold text-2xl">Dashboard</p>
                </div>
                <div className='flex items-center gap-3'>
                    {manageshop?.status === "draft" &&
                        <Button onClick={handleLaunchShop} disabled={isLoading}>
                            {isLoading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : "Launch"}
                        </Button>}
                    {manageshop?.status === "open" && <Button disabled>Launched</Button>}
                    {manageshop?.status === "expired" && <Button disabled>Closed</Button>}


                    <div className='flex items-center'>
                        <Link className='p-2 border' href={`/s/${uniqueUrl}`}>
                            <ExternalLink size={20} />
                        </Link>
                        <div className='p-2 border cursor-pointer' onClick={handleCopyLink}>
                            <Link2 size={20} />
                        </div>
                        <div className='p-2 border cursor-pointer'>
                            <Trash size={20} className='text-red-500' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-5 py-2'>
                <DashboardSidebar tab={tab} setTab={setTab} />
                <div className='py-5 px-5 w-full border rounded-xl min-h-screen'>{renderComponent()}</div>
            </div>
        </div>
    );
}

export default DashboardPage;
