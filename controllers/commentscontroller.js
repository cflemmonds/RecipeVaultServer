const router = require('express').Router();
const { CommentsModel } = require('../models');

router.post('/comment', async (req, res) => {
    
    const { content, postId } = req.body;

    try {
        await CommentsModel.create({
            content: content,
            postId: postId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: 'comment created'
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