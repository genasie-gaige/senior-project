import { gql } from "@apollo/client";

export const getALL = gql`
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
