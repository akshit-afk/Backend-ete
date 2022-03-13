const {register} = require('../controllers/userController');
const {login} = require('../controllers/userController');
const {getAllUsers} = require('../controllers/userController');
const {setAvatar} = require('../controllers/userController');
const {logOut} = require('../controllers/userController');
  const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
 router.post("/setAvatar/:id", setAvatar);
 router.get("/logout/:id", logOut);

module.exports = router;