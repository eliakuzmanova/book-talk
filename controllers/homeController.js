const userService = require("../services/userService");

exports.getHomeView = (req, res) => {
    res.render('home/index')
}

exports.get404View = (req, res) => {	
    res.render('home/404')
}

exports.getProfileView = async (req, res) => {
    try {
        const user = await userService.getUserWithBooks(req.user.userId)
        res.render("home/profile", {email: user.email, wishes: user.books})
    } catch (err) {
        return errorUtils.errorResponse(res, "home/404", err, 404);
    }

}