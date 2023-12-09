const validator = require('validator');
const Article = require("../models/Article");
const e = require('cors');

const test = async (req, res) => {
    return res.status(200).json({
        msg: "im a test action"
    });
}

const createArticle = async (req, res) => {

    let body = req.body;

    try {
        // validate data
        let validateTitle = !validator.isEmpty(body.title)
            && validator.isLength(body.title, { min: 5, max: undefined });
        let validateContent = !validator.isEmpty(body.content);

        if (!validateTitle || !validateContent) {
            throw new Error("data not validated");
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: "incorrect data",
        });
    }

    // Create object
    const article = new Article(body);

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

module.exports = {
    test,
    createArticle,
    getArticles,
    getArticleWithId,
}