const Book = require("../models/Book");

exports.create = (bookData, userId) => Book.create({...bookData, owner: userId})

exports.getAll = () => Book.find({}).lean();

exports.getOneById = (id) => Book.findById(id).lean();