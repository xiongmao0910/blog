// Import library
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Import components
const User = require("../models/User");

class UserController {
    // [POST] -> path: /user
    async index(req, res) {
        try {
            const user = await User.findById(req.id);
            if (!user) {
                return res
                    .status(404)
                    .json({ msg: "Không tìm thấy người dùng!" });
            }

            return res.status(200).json({
                data: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    photoURL: user.photoURL,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        } catch (error) {
            return res
                .status(400)
                .json({ msg: "Lỗi server. Vui lòng thử lại sau!" });
        }
    }

    // [POST] -> path: /user/register
    async register(req, res) {
        // * Get data from client
        const { username, email, password } = req.body;

        // * Check username and email is have?
        const isUser = await User.findOne({ username });
        const isEmail = await User.findOne({ email });

        if (isUser) {
            return res.status(403).json({
                success: false,
                msg: "Tên người dùng đã tồn tại!",
            });
        }

        if (isEmail) {
            return res.status(403).json({
                success: false,
                msg: "Địa chỉ email đã tồn tại",
            });
        }

        // * Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            photoURL: "",
            bio: "",
        });

        await newUser.save();

        return res.json({ success: true, msg: "Bạn đã đăng ký thành công!" });
    }

    // [POST] -> path: /user/login
    async login(req, res) {
        // * Get data from client
        const { email, password } = req.body;

        // * Check user data
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, msg: "Người dùng không tồn tại!" });
        }

        // * Check password is valid?
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                msg: "Email hoặc mật khẩu không chính xác. Vui lòng thực hiện lại!",
            });
        }

        const token = jwt.sign({ id: user._id }, "secret");

        return res.status(200).json({
            success: true,
            msg: "Bạn đã đăng nhập thành công",
            token,
            data: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                photoURL: user.photoURL,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    }

    // [GET] -> path: /:username
    async getUser(req, res) {
        const { username } = req.params;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: "Không tìm thấy người dùng!",
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    photoURL: user.photoURL,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        } catch (error) {
            return res
                .status(400)
                .json({ msg: "Lỗi server. Vui lòng thử lại sau!" });
        }
    }

    // [PUT] -> path: /user/update
    async update(req, res) {
        // * Get data from client
        const body = req.body;

        // * Update data to mongodb
        try {
            const user = await User.findOneAndUpdate(
                { email: body.email },
                body,
                {
                    new: true,
                }
            );

            return res.status(201).json({
                msg: "Thông tin người dùng được cập nhật!",
                success: true,
                data: {
                    username: user.username,
                    email: user.email,
                    bio: user.bio,
                    photoURL: user.photoURL,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        } catch (error) {
            return res
                .status(401)
                .json({ msg: "Something went wrong, try again...!" });
        }
    }
}

module.exports = new UserController();
