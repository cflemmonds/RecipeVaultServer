const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// router.get('/practice', (req, res) => {
//     res.send('Hey!! This is a practice route!')
// })

router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    try {
        const user = await UserModel.create({
            firstName,
            lastName,
            username,
            email,
            password: bcrypt.hashSync(password, 13)
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
                message: "Failed to register user"
            })
        }
    }
})

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

module.exports = router;