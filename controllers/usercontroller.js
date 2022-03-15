const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");

// router.get('/practice', (req, res) => {
//     res.send('Hey!! This is a practice route!')
// })

//! REGISTER

router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password, admin } = req.body;

    if (admin == true) {
        let adminUser = await models.UserModel.findAll({
            where: { admin: true },
        })
    
        if (adminUser.length>0) {
            res.status(409).json({
                message: err.message,
                message: "Standard user created"
            })
        }
    }

    try {
        const user = await UserModel.create({
            firstName,
            lastName,
            username,
            email,
            password: bcrypt.hashSync(password, 13),
            admin,
        });
        console.log(user)

        let token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: "Registration successful: Welcome to the Recipe Vault!",
            user: "user", user,
            sessionToken: token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use"
            })
        } else {
            res.status(500).json({
                message: err.message
            })
        }
    }
})

//! LOGIN

router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username: username
            }
        })

        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: loginUser,
                    message: "Login successful",
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password",
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to login",
        })
    }
})

//! GET USER INFO

router.get('/userinfo', async (req, res) => {
    try {
        await models.UserModel.findAll({
            include: [
                {
                    model: models.PostsModel,
                    include: [
                        {
                            model: models.CommentsModel
                        }
                    ]
                }
            ]
        })
            .then(
                users => {
                    res.status(200).json({
                        users: users
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