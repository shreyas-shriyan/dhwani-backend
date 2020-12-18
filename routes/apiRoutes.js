const express = require('express')
const bodyParser = require('body-parser')
const { getStateController, postStateController } = require('../controllers/stateController')
const { getChildController, postChildController } = require('../controllers/childController')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.get("/states", getStateController);
router.post("/state", postStateController)

router.get("/children", getChildController);
router.post("/child", postChildController)



module.exports = router;
