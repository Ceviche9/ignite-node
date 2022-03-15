import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError("Token is missing", 401)

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, '9219562338f5cdf95e537c7a251af3f7') as IPayload
    const usersRepository = new UsersRepository()

    const user = usersRepository.findById(user_id)

    if (!user) throw new AppError("User not found")

    request.user = {
      id: user_id
    }
  
    next()
  } catch(err) {
    throw new AppError("Token is invalid", 401)
  }
}