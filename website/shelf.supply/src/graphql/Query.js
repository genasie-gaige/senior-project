import { gql } from "@apollo/client";

export const getAll = gql`
  {
    getAll {
      id
      name
      user
      medId
      shelfSpot
      startWeight
      curWeight
    }
  }
`;
