import { ShopType } from '@/lib/types';
import useApp from '@/stores/useApp';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Shop() {
  const { uniqueUrl } = useParams() as { uniqueUrl: string };
  const { fetchShop } = useApp();

  const [shop, setShop] = useState<ShopType | null>(null);

  useEffect(() => {
    async function getShop() {
      const res = await fetchShop(uniqueUrl);
      setShop(res);
    }
    if (uniqueUrl) {
      getShop();
    }
  }, [uniqueUrl, fetchShop]);

  console.log(shop);

  return <div>Shop</div>;
}

export default Shop;
