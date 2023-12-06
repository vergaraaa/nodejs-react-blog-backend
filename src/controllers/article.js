const test = async (req, res) => {
    return res.status(200).json({
        msg: "im a test action"
    });
}


module.exports = {
    test,
}