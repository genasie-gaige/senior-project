const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    name: String,
    medId: String,
    shelfSpot: String,
    startWeight: String,
    curWeight: String
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post
