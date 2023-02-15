const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const bookController = require("../controllers/bookController")
const {authMiddleware} = require("../middlewares/authMiddleware")

//add middleware to the needed routes <<<<-----------------------

router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/create", bookController.getCreateView)
router.post("/create", bookController.postCreate)

router.get("/catalog", bookController.getCatalogView)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

module.exports = router