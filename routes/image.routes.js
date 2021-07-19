const express = require("express");

const imageController = require('../controllers/image.controller')

const router = express.Router();

router.post('/upload', imageController.upload )
router.get('/images', imageController.images)


module.exports = router;