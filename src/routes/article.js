const { Router } = require('express');
const { test, createArticle, getArticles, getArticleWithId } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)


router.get("/:limit?", getArticles);

router.get("/one/:id", getArticleWithId);

router.post("/create", createArticle);



module.exports = router;