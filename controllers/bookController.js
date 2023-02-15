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
        
        const bookId = req.params.bookId
   
        const book = await bookService.getOneById(bookId);

        const isAuth = req.user?.userId
       
        const isOwner = book.owner == req.user?.userId
        const isBuyer = book.wishList.some(x => x._id == req.user?.userId)
        

        res.render("book/details", {book, isAuth, isOwner, isBuyer})

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }

}

exports.getWish = async (req, res) => {
    
    try {
        const bookId = req.params.bookId
        const userId = req.user.userId

        const book = await bookService.getOneById(bookId);
       
        book.wishList.push(userId);
      
        await bookService.updateWishListById(bookId,book.wishList);
        res.redirect(`/details/${bookId}`);

    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
    
}

exports.getDelete = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        await bookService.delete(bookId)
        res.redirect("/catalog")
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }
}