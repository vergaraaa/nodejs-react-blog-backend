const { Router } = require('express');
const { test, createArticle, getArticles, getArticleWithId, deleteArticle, updateArticle } = require('../controllers/article');

const router = Router();

router.get("/test-route", test)


router.get("/:limit?", getArticles);

router.post("/create", createArticle);

router.get("/one/:id", getArticleWithId);

router.put("/one/:id", updateArticle);

router.delete("/one/:id", deleteArticle);


module.exports = router;