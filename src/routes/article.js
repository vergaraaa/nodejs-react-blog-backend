const { Router } = require('express');
const { test, createArticle } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)

router.route("/")
    .post(createArticle)

module.exports = router;