import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation createPost($name: String, $user: String, $medId: String, $shelfSpot: String, $startWeight: String, $curWeight: String) {
    createPost(post: { name: $name, user: $user, medId: $medId, shelfSpot: $shelfSpot, startWeight: $startWeight, curWeight: $curWeight }) {
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

export const UPDATE_POST = gql`
  mutation updatePost($id: String!, $curWeight: String!) {
    updatePost(id: $id, post: {curWeight: $curWeight}) {
      id
      curWeight
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String) {
    deletePost(id: $id)
  }
`;
