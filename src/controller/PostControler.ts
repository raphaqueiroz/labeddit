import { ZodError } from "zod";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../dtos/post/createPost.dto";
import { GetPostsSchema } from "../dtos/post/getPosts.dto";
import { EditPostSchema } from "../dtos/post/editPost.dto";
import { DeletePostSchema } from "../dtos/post/deletePost.dto";
import { LikeDislikeSchema } from "../dtos/post/likeDislike.dto";

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    public createPost = async (req: Request, res: Response) =>{
        try{

            const input = CreatePostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content
            })

            const response = await this.postBusiness.createPost(input)
            res.status(201).send(response)

        } catch (error) {
        console.log(error)
        if(error instanceof ZodError) { // erro de dados de entrada.
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }

    public getPosts = async (req: Request, res: Response) =>{
        try{

            const input = GetPostsSchema.parse({
                token: req.headers.authorization,
            })

            const response = await this.postBusiness.getPosts(input)
            res.status(200).send(response)

        } catch (error) {
        console.log(error)
        if(error instanceof ZodError) { // erro de dados de entrada.
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }

    public editPost = async (req: Request, res: Response) =>{
        try{

            const input = EditPostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content,
                postId: req.params.id
            })

            const response = await this.postBusiness.editPost(input)
            res.status(200).send(response)

        } catch (error) {
        console.log(error)
        if(error instanceof ZodError) { // erro de dados de entrada.
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }

    public deletePost = async (req: Request, res: Response) =>{
        try{

            const input = DeletePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id
            })

            const response = await this.postBusiness.deletePost(input)
            res.status(200).send(response)

        } catch (error) {
        console.log(error)
        if(error instanceof ZodError) { // erro de dados de entrada.
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }

    public likeDislike = async (req: Request, res: Response) =>{
        try{

            const input = LikeDislikeSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like
            })

            const response = await this.postBusiness.likeDislike(input)
            res.status(200).send(response)

        } catch (error) {
        console.log(error)
        if(error instanceof ZodError) { // erro de dados de entrada.
            res.status(400).send(error.issues)
            
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else { 
            res.status(500).send("Erro inesperado")
        }
        }
    }

    

}