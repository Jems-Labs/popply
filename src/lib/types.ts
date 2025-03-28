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
export type useAppType = {
  user: User | null;
  fetchUser: () => void;
  signup: (fromData: signupType) => void;
  login: (formData: loginType) => void;
  logout: () => void;
};
