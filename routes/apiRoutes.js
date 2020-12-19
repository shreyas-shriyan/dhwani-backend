const express = require('express')
const bodyParser = require('body-parser')
const { getStateController, postStateController } = require('../controllers/stateController')
const { getChildController, postChildController } = require('../controllers/childController')
const { getDistrictController, postDistrictController } = require('../controllers/districtController')
const { userLogoutController, userLoginController, userRegisterController } = require('../controllers/authController')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.get("/states", getStateController);
router.post("/state", postStateController)

router.get("/children", getChildController);
router.post("/child", postChildController)

router.get("/districts", getDistrictController);
router.post("/district", postDistrictController);

router.get("/user/logout", userLogoutController);
router.post("/user/login", userLoginController);
router.post("/user/register", userRegisterController);

module.exports = router;
