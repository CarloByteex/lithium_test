import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login ($data: IUser) {
    login(data: $data)
  }
`
export const REGISTER = gql`
  mutation Register($data: IUser) {
    register(data: $data)
  }
`

export const OAUTH_GOOGLE = gql`
  mutation OAuthGoogle($token: String) {
    oAuthGoogle(token: $token)
  }
`