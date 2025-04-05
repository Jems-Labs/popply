import useApp from '@/stores/useApp'
import { ArrowBigUp, Eye, MousePointerClick } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import Link from 'next/link'

function Analytics() {
  const { manageshop } = useApp()
  const views = manageshop?.views || []
  const products = manageshop?.products || []

  const sortedProducts = [...products].sort((a, b) => b.clicks - a.clicks)

  return (
    <div className="p-6 space-y-6">


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">

        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-muted-foreground text-sm font-medium">
              Total Views
            </h3>
            <Eye size={20} className="text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{views.length}</div>
          <p className="text-xs text-muted-foreground mt-1">
            All time views on your shop
          </p>
        </div>

        <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-muted-foreground text-sm font-medium">
              Total Upvotes
            </h3>
            <ArrowBigUp size={20} className="text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">0</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total upvotes on your shop
          </p>
        </div>

      </div>


      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5" />
          Views ({views.length})
        </h1>

        <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2">
          {views.length === 0 ? (
            <p className="text-gray-500 text-sm">No viewers yet.</p>
          ) : (
            views.map((view) => (
              <Link href={`/u/${view?.id}`} key={view.id} className='cursor-pointer'>
                <div
                  className="flex items-center justify-between border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {view.user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium hover:underline">{view.user.name}</p>
                      <p className="text-sm text-gray-500">{view.user.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      Viewed on {format(new Date(view.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <MousePointerClick className="w-5 h-5" />
          Top Products
        </h1>

        {sortedProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products yet.</p>
        ) : (
          <div className="grid gap-4">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border rounded-2xl p-4 hover:shadow-sm transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h2 className="font-medium">{product.name}</h2>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <MousePointerClick size={16} />
                  {product.clicks}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Analytics
