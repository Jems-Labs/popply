"use client"
import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Link2, Trash } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function Dashboard() {
    const {uniqueUrl} = useParams();
    
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
            <DashboardSidebar />
        </div>
    )
}

export default Dashboard