// Import components
const Post = require("../models/Post");

class PostController {
    // [GET] -> path: /post
    async index(req, res) {
        try {
            const posts = await Post.find({});

            if (!posts) {
                return res.status(404).json({
                    success: false,
                    msg: "Chưa có bài viết!",
                });
            }

            return res.status(200).json({
                success: true,
                data: posts,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: "Lỗi server. Vui lòng thử lại sau!",
            });
        }
    }

    // [GET] -> path: /post/:username/:slug
    async getPost(req, res) {
        const { username, slug } = req.params;

        try {
            const post = await Post.findOne({ username, slug });
            if (!post) {
                return res.status(404).json({
                    success: false,
                    msg: "Không tìm thấy bài viết!",
                    username,
                    slug,
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    title: post.title,
                    content: post.content,
                    avatar: post.avatar,
                    username: post.username,
                    slug: post.slug,
                    tags: post.tags,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                },
            });
        } catch (error) {
            return res
                .status(400)
                .json({ msg: "Lỗi server. Vui lòng thử lại sau!" });
        }
    }

    // [POST] -> path: /post/create
    async create(req, res) {
        // * Get data from client
        const data = req.body;

        // * Save data to db
        const newPost = new Post({
            ...data,
        });

        try {
            await newPost.save();
            return res.status(201).json({
                success: true,
                msg: "Bạn đã tạo bài viết thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: "Lỗi tạo bài viết. Vui lòng thực hiện lại!",
            });
        }
    }

    // [PUT] -> path: /post/edit
    async edit(req, res) {}

    // [DELETE] -> path: /post/delete
    async delete(req, res) {
        // * Get data from client
        const { username, slug } = req.body;

        try {
            const post = await Post.findOneAndDelete({ username, slug });

            if (!post) {
                return res.status(404).json({
                    success: false,
                    msg: "Lỗi xóa bài viết!!",
                });
            }

            return res.status(200).json({
                success: true,
                msg: "Bài viết đã được xóa.",
            });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, msg: "Lỗi xóa bài viết!!" });
        }
    }
}

module.exports = new PostController();
