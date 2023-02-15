const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: [2, "Too short title"]
    },
    author: {
        type: String,
        required: true,
        minLength: [5, "Too short author"]
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "URL is invalid"
        }
    },
    review: {
        type: String,
        required: true,
        minLength: [10, "Too short review"]
    },
    genre:{
        type: String,
        required: true,
        minLength: [3, "Too short title"]
    },
    stars: {
        type: Number,
        enum: {
            values: [1,2,3,4,5],
            message: "Stars can be only between 1 and 5"
        }
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

});

const Book = mongoose.model("Book", bookSchema)

module.exports = Book;