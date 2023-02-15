const Book = require("../models/Book");

exports.create = (bookData, userId) => Book.create({...bookData, owner: userId})

exports.getAll = () => Book.find({}).lean();

exports.getOneById = (id) => Book.findById(id).lean();

exports.updateWishListById = (id, bookwishList) => Book.findByIdAndUpdate(id, {wishList: bookwishList})

exports.delete = (id) => Book.findByIdAndDelete(id)

exports.edit = (id, title, author, genre, stars, image, review) => Book.findByIdAndUpdate(id, {title, author, genre, stars, image, review}).lean();