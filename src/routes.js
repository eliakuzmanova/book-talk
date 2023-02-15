const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const bookController = require("../controllers/bookController")
const {isAuth} = require("../middlewares/authMiddleware") //<---fix name on isAuth

//add middleware to the needed routes <<<<-----------------------

router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/create",isAuth, bookController.getCreateView)
router.post("/create",isAuth, bookController.postCreate)

router.get("/catalog", bookController.getCatalogView)

router.get("/details/:bookId", bookController.getDetailsView)
router.get("/wish/:bookId",isAuth, bookController.getWish)

router.get("/delete/:bookId",isAuth, bookController.getDelete)

router.get("/edit/:bookId",isAuth, bookController.getEditView)
router.post("/edit/:bookId",isAuth, bookController.postEdit)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout",isAuth, authController.getLogout);

module.exports = router