import { UserBusiness } from "../business/UserBusiness";
import { SignupSchema } from "../dtos/user/signup.dto";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ) {}

    public signUp = async (req: Request, res: Response) => {
        try{
            const input = SignupSchema.parse({
                name: req.body.name,
                nickName: req.body.nickName,
                email: req.body.email,
                password: req.body.password

            })

            const response = await this.userBusiness.signUp(input)

            res.status(201).send(response)
        } catch (error) {
            console.log(error)
        if(error instanceof ZodError) {
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }
}