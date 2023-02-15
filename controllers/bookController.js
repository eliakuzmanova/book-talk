const bookService = require("../services/bookService");
const errorUtils = require("../utils/errorUtils")

exports.getCreateView = (req, res) => {
    res.render("book/create")
}

exports.postCreate = async (req, res) => {

    try {
        const bookData = req.body
        await bookService.create(bookData, req.user.userId);
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

exports.getDetailsView = async (req, res) => {
    try {
        console.log("Hallo");
        const bookId = req.params.bookId
        console.log(bookId);
        const book = await bookService.getOneById(bookId);
        console.log(book);
        const isAuth = req.user?.userId
        console.log(Boolean(isAuth) + "   authenticate");
        const isOwner = book.owner == req.user?.userId
        console.log(isOwner + "   owner");
        const isBuyer = book.wishList.some(x => x._id == req.user?.userId)
        console.log(isBuyer + "  buyer");

        res.render("book/details", {book, isAuth, isOwner, isBuyer})

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }

}