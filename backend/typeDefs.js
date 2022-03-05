const { gql } = require("apollo-server-express")

const typeDefs = gql`

type Post{
    id:ID
    name: String
    medId: String
    shelfSpot: String
    startWeight: String
    curWeight: String
}

type Query{
    getAll:[Post]
}

input PostInput{
    name: String
    medId: String
    shelfSpot: String
    startWeight: String
    curWeight: String
}

type Mutation{
    createPost(post:PostInput):Post
    updatePost(id: String, post: PostInput): Post
    deletePost(id: String): String
}
`

module.exports = typeDefs
