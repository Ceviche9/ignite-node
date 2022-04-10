export interface IUsersResponseDTO {
  name: string,
  avatar: string,
  email: string
  driver_license: string
  avatar_url(): string,
  isAdmin: boolean
}