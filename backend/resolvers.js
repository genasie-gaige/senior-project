const Post = require('./post')

const resolvers = {
    Query: {
        getAll: async () => {
            return await Post.find()
        },
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { name, medId, shelfSpot, startWeight, curWeight } = args.post
            const post = await new Post({ name, medId, shelfSpot, startWeight, curWeight }).save()
            return post
        },
        updatePost: async (parent, args, context, info) => {
            const { id } = args;
            const { name, medId, shelfSpot, startWeight, curWeight } = args.post;
            const post = await Post.findByIdAndUpdate(
                id,
                { name, medId, shelfSpot, startWeight, curWeight },
                { new: true }
            );
            return post;
        },
        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            await Post.findByIdAndDelete(id);
            return "Deleted";
        },
    }
}

module.exports = resolvers
