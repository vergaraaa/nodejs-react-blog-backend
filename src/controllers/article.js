const fs = require('fs');
const path = require('path');

const { validateArticle } = require("../helpers/validateArticle");
const Article = require("../models/Article");

const test = async (req, res) => {
    return res.status(200).json({
        msg: "im a test action"
    });
}

const createArticle = async (req, res) => {
    try {
        validateArticle(req.body);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "incorrect data",
        });
    }

    // Create object
    const article = new Article(req.body);

    // Save in database
    const newArticle = await article.save();

    // If error on saving
    if (!newArticle) {
        return res.status(400).json({
            status: "error",
            msg: "article has not been saved",
        });
    }

    // Success response
    return res.status(200).json({
        status: "success",
        article: newArticle,
    });
}

const getArticles = async (req, res) => {
    try {
        const { limit } = req.params;

        const articles = await Article
            .find({})
            .sort({ date: -1 })
            .limit(limit);

        return res.status(200).json(
            articles
        );
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

const getArticleWithId = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                msg: "Article not found"
            });
        }

        return res.status(200).json(
            article
        );
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

const updateArticle = async (req, res) => {
    try {
        validateArticle(req.body);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "incorrect data",
        });
    }

    try {
        const { id } = req.params;

        const article = await Article.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!article) {
            return res.status(404).json({
                status: "error",
                msg: "Article not found"
            });
        }

        return res.status(200).json({
            status: "success edit",
            article,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findOneAndDelete({ _id: id });

        if (!article) {
            return res.status(404).json({
                status: "error",
                msg: "Article not found"
            });
        }

        return res.status(200).json({
            status: "success",
            article
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }

}

const uploadImage = async (req, res) => {
    // get file
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            msg: "Invalid request"
        });
    }

    // filename
    let filename = req.file.originalname;

    // file extension
    let fileSplit = filename.split("\.");
    let extension = fileSplit[1];

    // validate extension
    if (extension != "png" && extension != "jpg" &&
        extension != "jpeg" && extension != "gif") {
        // delete file if not valid
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                msg: "Invalid image"
            });
        })
    } else {
        // update article
        try {
            const { id } = req.params;

            const article = await Article.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true });

            if (!article) {
                return res.status(404).json({
                    status: "error",
                    msg: "Article not found"
                });
            }

            // response
            return res.status(200).json({
                status: "success photo edit",
                article,
                file: req.file,
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "Internal Server Error"
            });
        }
    }
}

const getImage = async (req, res) => {
    let file = req.params.file;
    let filePath = "./src/images/articles/" + file;

    console.log(filePath);

    try {
        fs.stat(filePath, (error, exists) => {
            if (exists) {
                return res.sendFile(path.resolve(filePath));
            }
            else {
                return res.status(404).json({
                    status: "error",
                    msg: "Image not found",
                    exists,
                    file,
                    filePath,
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

module.exports = {
    test,
    createArticle,
    getArticles,
    getArticleWithId,
    updateArticle,
    deleteArticle,
    uploadImage,
    getImage,
}