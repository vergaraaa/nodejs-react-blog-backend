const { Router } = require('express');
const { test, createArticle, getArticles } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)

router.route("/")
    .get(getArticles)
    .post(createArticle);

module.exports = router;