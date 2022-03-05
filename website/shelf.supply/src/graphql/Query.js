import { gql } from "@apollo/client";

export const getAll = gql`
  {
    getAll {
      id
      name
      medId
      shelfSpot
      startWeight
      curWeight
    }
  }
`;
