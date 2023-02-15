const bookService = require("../services/bookService");
const errorUtils = require("../utils/errorUtils")

exports.getCreateView = (req, res) => {
    res.render("book/create")
}

exports.postCreate = async (req, res) => {

    try {
        const bookData = req.body
        await bookService.create(bookData);
        res.redirect("/catalog")
    } catch (err) {
        return errorUtils.errorResponse(res, "book/create", err, 404);
    }
}

exports.getCatalogView = async (req, res) => {

    try {
        const books = await bookService.getAll();
        res.render("book/catalog", {books})
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
}