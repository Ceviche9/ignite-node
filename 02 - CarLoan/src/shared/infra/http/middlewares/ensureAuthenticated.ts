import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string
}

export async function ensureAthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError("Token is missing", 401)

  const [, token] = authHeader.split(" ");
  try {

    const { sub: user_id } = verify(
      token, 
      auth.token_Secret
    ) as IPayload

    request.user = {
      id: user_id
    }
  
    next()
  } catch(err) {
    throw new AppError("Token is invalid", 401)
  }
}