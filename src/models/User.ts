export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    name: string,
    nickname: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    nickName: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export class User {
    constructor (
        public id: string,
        public name: string,
        public nickName: string,
        public email: string,
        public password: string,
        public role: USER_ROLES,
        public created_at: string
    ) {}

    public getId (): string {
        return this.id
    }

    public setId (value: string): void {
        this.id = value
    }

    public getName (): string {
        return this.name
    }

    public setName (value: string): void {
        this.name = value
    }

    public getNickName (): string {
        return this.nickName
    }

    public setNickName (value: string): void {
        this.nickName = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.created_at
    }

    public setCreatedAt(value: string): void {
        this.created_at = value
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            nickName: this.nickName,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.created_at
        }
    }
}