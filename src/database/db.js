const e = require('cors');
const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodejs-react-blog");

        console.log("db connected");
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    connection
}

// brew services start mongodb-community@7.0
// brew services stop mongodb-community@7.0