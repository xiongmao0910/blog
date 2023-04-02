// Import library
const mongoose = require("mongoose");

async function connect(username, password) {
    try {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@blog.jb8uwgl.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useMongoClient: true,
            }
        );

        console.log("Connect successfully!!");
    } catch (error) {
        console.log("Connect failed!!");
    }
}

module.exports = {
    connect,
};
