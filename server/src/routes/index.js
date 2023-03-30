// Import components
const userRouter = require("./user");
const postRouter = require("./post");

function route(app) {
    app.use("/user", userRouter);
    app.use("/post", postRouter);
}

module.exports = route;
