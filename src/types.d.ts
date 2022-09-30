import { SetStateAction } from "react";

export interface IAuthContext {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  logout: () => void;
  login: (data: IAuthResponse) => void;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IArticle {
  id: number;
  title: string;
  description?: string;
  body: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  featuredAssetId: number;
  featuredAsset: Asset | null;
}

export interface IArticleResponse {
  data: IArticle[];
  meta: IPageMeta;
}

export interface IPageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Asset {
  id: number;
  fileName: string;
  size: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  publicId: string;
}
