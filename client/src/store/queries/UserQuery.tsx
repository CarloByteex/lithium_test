import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query isAuthenticated {
    isAuthenticated {
      id
      name
      email
    }
  }
`