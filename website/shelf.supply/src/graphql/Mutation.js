import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation createPost($name: String, $medId: String, $shelfSpot: String, $startWeight: String, $curWeight: String) {
    createPost(post: { name: $name, medId: $medId, shelfSpot: $shelfSpot, startWeight: $startWeight, curWeight: $curWeight }) {
        id
        name
        medId
        shelfSpot
        startWeight
        curWeight
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String) {
    deletePost(id: $id)
  }
`;
