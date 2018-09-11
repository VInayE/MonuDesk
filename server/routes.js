const express = require('express')
const router = express.Router()
const serverController = require('./serverController')

router.route('/payments/status').post(serverController.postPaymentStatus)
router.route('/payments/status').get(serverController.getPaymentStatus)
router.route('/setWhtsappAPI').post(serverController.setWhtsappAPI)
//router.route('/checkWhtsappAPI').post(serverController.checkWhtsappAPI)

module.exports = router