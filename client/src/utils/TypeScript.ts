import { ChangeEvent, FormEvent } from 'react'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface IParams {
    page: string
    slug: string
}

export interface IUserLogin {
    account: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
    cf_password: string
}

export interface IUser extends IUserLogin {
    avatar: string
    createdAt: string
    name: string
    role: string
    type: string
    updatedAt: string
    _id: string
}

export interface IReview {
    _id?: string
    user: string | IUser
    title: string
    content: string
    reviews: string[]
    subject: string
    lecturer: string
    tags: string[]
    createdAt: string
}