import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signUp = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

        const {name, nickName,email, password} = input

        const isEmail = await this.userDatabase.findByEmail(email)
        if (isEmail) {
            throw new ConflictError ("email já cadastrado")
    }

        const isNickname = await this.userDatabase.findByNickName(nickName)
        if (isNickname) {
            throw new ConflictError ("Nick name já cadastrado")
        }

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hashManager.hash(password)

    const user = new User (
        id,
        name,
        nickName,
        email,
        hashedPassword,
        USER_ROLES.NORMAL,
        new Date().toISOString()

    )

    await this.userDatabase.insertUser(user.toDBModel())

    const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        nickname: user.getNickName(),
        role: user.getRole()

    }

    const token = this.tokenManager.createToken(payload)

    const response: SignupOutputDTO = {
        token: token
    }

    return response

    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

        const {email, password} = input

        const userDB = await this.userDatabase.findByEmail(email)
        if (!userDB) {
            throw new ConflictError ("email já não cadastrado")
    }

    const user = new User (
        userDB.id,
        userDB.name,
        userDB.nickName,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at

    )

    const isPasswordCorrect = await this .hashManager
    .compare(password, user.getPassword())

    if (!isPasswordCorrect) {
        throw new BadRequestError("senha incorrreta")
    }

    const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        nickname: user.getNickName(),
        role: user.  getRole()
    }

    const token = this.tokenManager.createToken(payload)

    const response: LoginOutputDTO = {
        token: token
    }

    return response
    

    }
}