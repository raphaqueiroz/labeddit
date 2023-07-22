import z from "zod"

export interface SignupInputDTO {
    name: string,
    nickName: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    token: string
}

export const SignupSchema = z.object ({
    name: z.string().min(3),
    nickName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3)
}).transform(data => data as SignupInputDTO)