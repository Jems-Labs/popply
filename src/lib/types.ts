export type User = {
  id: number;
  name: string;
  email: string;
};
export type signupType = {
  name: string;
} & loginType;

export type loginType = {
  email: string;
  password: string;
};

export type createShopResponse = {
  id: number;
  uniqueUrl: string;
};

export type updateShop = {
  name: string;
  description: string;
  category: string;
};

export type productType = {
  id: number;
  name: string;
  description: string;
  price: number;
  shopId: number;
  shop: ShopType;
  image: string;
  productUrl: string;
};
export type commentType = {
  id: number;
  userId: number;
  user: User;
  shopId: number;
  shop: ShopType;
  text: string;
  likes: number;
};
export type ShopType = {
  id: number;
  ownerId: number;
  owner: User;
  name: string;
  description: string;
  logo: string;
  banner: string;
  category: string;
  uniqueUrl: string;
  products: productType[];
  comments: commentType[];
};

export type useAppType = {
  user: User | null;

  manageshop: ShopType | null;
  fetchUser: () => void;
  signup: (fromData: signupType) => void;
  login: (formData: loginType) => void;
  logout: () => void;
  createShop: (formData: FormData) => Promise<createShopResponse>;
  fetchMyShops: () => Promise<ShopType[]>;
  fetchManageShop: (url: string) => void;
  updateShop: (url: string, formData: updateShop) => void;
  addProduct: (id: number | undefined, formData: FormData) => void;
  fetchProducts: (id: number) => Promise<productType[] | []>;
  deleteProduct: (id: number) => void;
  fetchShop: (url: string) => Promise<ShopType | null>;
  addComment: (data: { shopId: number | undefined; text: string }) => void;
};
