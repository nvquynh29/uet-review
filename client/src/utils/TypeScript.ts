import { ChangeEvent, FormEvent, MouseEventHandler } from "react";

export type InputChange = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type SelectChange = ChangeEvent<HTMLSelectElement>

export type ButtonClick = MouseEventHandler<HTMLButtonElement>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  updatedAt: string;
  _id: string;
}

export interface IReview {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  reviews: string[];
  subject: string;
  lecturer: string;
  tags: string[];
  createdAt: string;
}
export interface IComment {
  _id?: string;
  author_id?: string;
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
  type?: number;
}

export interface ICredential {
  email: string;
  password: string;
  nickname?: string;
}

export interface IReport {
  slug: string
  reason: string
  detail?: string
}

export type Cookie = {
  accessToken: string
  refreshToken?: string
  _id: string
  role: string
  nickname: string
}
