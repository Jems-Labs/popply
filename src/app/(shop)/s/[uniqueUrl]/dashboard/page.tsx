"use client";
import React, { useEffect, useState } from 'react';
import DashboardSidebar from './_components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Link2, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Dashboard from './_components/Dashboard';
import Analytics from './_components/Analytics';
import Products from './_components/Products';
import Shop from './_components/Shop';
import useApp from '@/stores/useApp';
function DashboardPage() {
    const { uniqueUrl }: { uniqueUrl: string } = useParams();
    const [tab, setTab] = useState("dashboard");
    const { fetchManageShop, user } = useApp();
    const renderComponent = () => {
        switch (tab) {
            case "dashboard":
                return <Dashboard />;
            case "shop":
                return <Shop />;
            case "products":
                return <Products />;
            case "analytics":
                return <Analytics />;
            default:
                return <Dashboard />;
        }
    };


    useEffect(() => {
        fetchManageShop(uniqueUrl)
    }, [fetchManageShop, user])
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
                    <Button>Launch</Button>
                    <div className='flex items-center'>
                        <Link className='p-2 border' href={`/s/${uniqueUrl}`}>
                            <ExternalLink size={20} />
                        </Link>
                        <div className='p-2 border'>
                            <Link2 size={20} />
                        </div>
                        <div className='p-2 border'>
                            <Trash size={20} />
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
