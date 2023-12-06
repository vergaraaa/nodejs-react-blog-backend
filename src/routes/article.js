const { Router } = require('express');
const { test } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)


module.exports = router;