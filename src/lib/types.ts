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
  status: string;
};
export type useAppType = {
  user: User | null;
  myShops: ShopType[] | []
  fetchUser: () => void;
  signup: (fromData: signupType) => void;
  login: (formData: loginType) => void;
  logout: () => void;
  createShop: (formData: FormData) => Promise<createShopResponse>;
  fetchMyShops: () => void;
  fetchShop: (url: string) => Promise<ShopType>
};
