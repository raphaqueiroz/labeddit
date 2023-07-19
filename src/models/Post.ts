export interface PostDB { //modelo a ser usado no banco de dados
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string

}

export interface PostModel { //modelo a ser usado no front
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getComments(): number {
        return this.comments
    }

    public setComments(value: number): void {
        this.comments = value
    }

    public addLike (): void {
        this.likes += 1
    }

    public removeLike (): void {
        this.likes -= 1
    }

    public addDislike (): void {
        this.dislikes += 1
    }

    public removeDislike (): void {
        this.dislikes -= 1
    }

    public getCreatedAt (): string {
        return this.createdAt
    }

    public setCreatedAt (value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt (): string {
        return this.updatedAt
    }

    public setUpdatedAt (value: string): void {
        this.updatedAt = value
    }

    public getCreatorId (): string {
        return this.creatorId
    }

    public setCreatorId (value: string): void {
        this.creatorId = value
    }

    public getCreatorName (): string {
        return this.creatorName
    }

    public setCreatorName (value: string): void {
        this.creatorName = value
    }

    public toDBModel(): PostDB  {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt

        }
    }

    public toBusinessModel(): PostModel {
        return{
            id: this.id,
    content: this.content,
    likes: this.likes,
    dislikes: this.dislikes,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    creator: {
        id: this.creatorId,
        name: this.creatorName
    }
        }
    }
}