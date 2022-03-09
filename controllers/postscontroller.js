const router = require('express').Router();
const { PostsModel } = require('../models');

router.post('/post', async (req, res) => {
    const { title, content } = req.body;

    try {
        await PostsModel.create({
            title: title,
            content: content,
            userId: req.user.id
        })
            .then(
                post => {
                    res.status(201).json({
                        post: post,
                        message: 'post created'
                    })
                }
            )
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;