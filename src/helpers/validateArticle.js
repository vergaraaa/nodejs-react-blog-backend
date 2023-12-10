const validator = require('validator');

const validateArticle = (body) => {
    // validate data
    let validateTitle = !validator.isEmpty(body.title)
        && validator.isLength(body.title, { min: 5, max: undefined });
    let validateContent = !validator.isEmpty(body.content);

    if (!validateTitle || !validateContent) {
        throw new Error("data not validated");
    }
}

module.exports = {
    validateArticle
}