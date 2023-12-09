const { Router } = require('express');
const { test, createArticle, getArticles, getArticleWithId, deleteArticle } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)


router.get("/:limit?", getArticles);

router.get("/one/:id", getArticleWithId);

router.post("/create", createArticle);

router.delete("/one/:id", deleteArticle);


module.exports = router;