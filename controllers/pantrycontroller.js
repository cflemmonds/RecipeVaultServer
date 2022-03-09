const Express = require('express');
const router = Express.Router();
const { PantryModel } = require("../models")

// router.get('/practice', (req, res) => {
//     res.send('Hey!! This is a practice route!')
// })

//! RECIPE ENDPOINTS

router.post('/recipeEntry', async (req, res) => {
    const { title, meat, veggies, fruit, spices, servings, timeToCook } = req.body
    const { id } = req.user
    try {
        const createRecipe = await PantryModel.create({
            title,
            meat,
            veggies,
            fruit,
            spices,
            servings,
            timeToCook,
            ownerID: id
        })

        res.status(201).json({
            message: "Recipe successfully created",
            createRecipe
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create recipe ${err}`
        })
    }
})

router.get('/myRecipe/:id', async (req, res) => {
    const { id } = req.user;
    try {
        const myRecipes = await PantryModel.findAll({
            where: {
                ownerID: id
            }
        })
        res.status(200).json(myRecipes);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.put('/editRecipe/:id', async (req, res) => {
    const { title, meat, veggies, fruit, spices, servings, timeToCook } = req.body
    try {
        await PantryModel.update(
            { title, meat, veggies, fruit, spices, servings, timeToCook },
            { where: { id: req.params.id }, returning: true }

        )
            .then((result) => {
                res.status(200).json({
                    message: "Recipe updated.",
                    updatedRecipe: result
                })
            })
    } catch (err) {
        res.status(500).json({
            message: `Failed to update property ${err}`
        })
    }
})

router.delete('/deleteRecipe/:id', async (req, res) => {
    try {
        await PantryModel.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            message: "Recipe deleted."
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete recipe ${err}`
        })
    }
})

//! INGREDIENT ENDPOINTS

// router.post('/itemEntry', (req, res) => {
//     res.send("this is the Recipe Entry route!");
// })

// router.get('/myItems/:id', (req, res) => {
//     res.send("This is your recipe book!");
// })

// router.put('/editItems/:id', (req, res) => {
//     res.send("You can edit your recipe");
// })

// router.delete('/deleteItem/:id', (req, res) => {
//     res.send("You can delete recipes from here!")
// })

//! Add the rest of the ingredient endpoints here. Add a response and test in Postman.

module.exports = router;