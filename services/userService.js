const User = require("../models/User");

exports.getUser = (userId) => User.findById(userId).lean();

exports.updateBooks = (userId, books) => User.findByIdAndUpdate(userId, {books: books})

exports.getUserWithBooks = (userId) => User.findById(userId).populate("books").lean();