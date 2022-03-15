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

router.get('/myPosts', async (req, res) => {
    const { id } = req.user;
    try {
        const myPosts = await PostsModel.findAll({
            where: {
                userId: id
            }
        })
        res.status(200).json(myPosts);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put('/editPost/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        await PostsModel.update(
            { title, content },
            { where: { id: req.params.id }, returning: true }
        )
            .then((result) => {
                res.status(200).json({
                    message: "Post saved.",
                    updatedPost: result
                })
            })
    } catch (err) {
        res.status(500).json({
            message: `Failed to update post ${err}.`
        })
    }
})

router.delete('/deletePost/:id', async (req, res) => {
    try {
        await PostsModel.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            message: "Post deleted."
        })
    } catch (err) {
        message: `Failed to delete post ${err}.`
    }
})

module.exports = router;