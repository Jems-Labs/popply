import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import React, {useState } from 'react';
import AddNewProduct from './AddNewProduct';
import useApp from '@/stores/useApp';
import { productType } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';


function Products() {
  const [open, setOpen] = useState(false);
  const { manageshop, fetchProducts, deleteProduct } = useApp();

  const {data: products, refetch} = useQuery<productType[]>({
    queryKey: ['products', manageshop?.id],
    queryFn: async () => {
      if(!manageshop?.id) return [];
      const res = await fetchProducts(manageshop.id);
      return res;
    },
    retry: 1,
    staleTime: 1000 * 60 * 2, // stale for 2 minutes
  })
  const handleDelete = async (productId: number) => {
    await deleteProduct(productId);
    refetch(); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="font-semibold text-2xl">Products</p>
          <p className="text-lg text-gray-500">Manage and update your shop's products</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2" /> New Product</Button>
          </DialogTrigger>
          <AddNewProduct />
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price (INR)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (

            <TableRow key={product.id} className='cursor-pointer'>
              <TableCell>
                <Image src={product.image} alt={product.name} width={50} height={50} className="rounded-md" />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="font-semibold">{product.price}</TableCell>
              <TableCell>
                <Button className='text-red-500' onClick={()=>handleDelete(product.id)}><Trash /></Button>
              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </div >
  );
}

export default Products;
