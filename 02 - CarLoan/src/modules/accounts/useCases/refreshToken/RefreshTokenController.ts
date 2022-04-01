
class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {


    return response.json()
  }
}

export { RefreshTokenController }