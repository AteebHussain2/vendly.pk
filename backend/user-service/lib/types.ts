export type TypeUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string

    gender?: Gender,
    age?: number,
    image?: string,
    bio?: string,

    privacyPolicy: boolean,
    newsletter: boolean,
}

export type TypeLogIn = {
    email: string,
    password: string
}

export enum Gender {
    MALE,
    FEMALE,
    CUSTOM
}