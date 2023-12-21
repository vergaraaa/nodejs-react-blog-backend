const { Router } = require('express');
const multer = require('multer');

const { test, createArticle, getArticles, getArticleWithId, deleteArticle, updateArticle, uploadImage, getImage, searchArticles } = require('../controllers/article');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/images/articles");
    },
    filename: function (req, file, cb) {
        cb(null, "article" + Date.now() + file.originalname);
    },
});

const uploads = multer({ storage: storage });

router.get("/test-route", test);

router.get("/:limit?", getArticles);

router.post("/create", createArticle);

router.get("/one/:id", getArticleWithId);

router.put("/one/:id", updateArticle);

router.delete("/one/:id", deleteArticle);

router.post("/upload-image/:id", [uploads.single("file")], uploadImage)

router.get("/image/:file", getImage);

router.get("/search/:query", searchArticles);

module.exports = router;