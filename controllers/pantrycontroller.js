const Express = require('express');
const router = Express.Router();
const { PantryModel } = require("../models")

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
})

//! RECIPE ENDPOINTS

router.post('/recipeEntry', async (req, res) => {
    try {
        const createRecipe = await PantryModel.create({
            title: req.body.title,
            meat: req.body.meat,
            veggies: req.body.veggies,
            fruit: req.body.fruit,
            spices: req.body.spices,
            servings: req.body.servings,
            timeToCook: req.body.timeToCook,
            ownerID: req.body.ownerID
        })
        console.log(createRecipe)
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
    } catch(err) {
        res.status(500).json({error: err})
    }
})

router.put('/editRecipe/:id', (req, res) => {
    res.send("You can edit your recipe");
})

router.delete('/deleteRecipe/:id', (req, res) => {
    res.send("You can delete recipes from here!")
})

//! INGREDIENT ENDPOINTS

router.post('/itemEntry', (req, res) => {
    res.send("this is the Recipe Entry route!");
})

router.get('/myItems/:id', (req, res) => {
    res.send("This is your recipe book!");
})

router.put('/editItems/:id', (req, res) => {
    res.send("You can edit your recipe");
})

router.delete('/deleteItem/:id', (req, res) => {
    res.send("You can delete recipes from here!")
})

// ! Add the rest of the ingredient endpoints here. Add a response and test in Postman.

module.exports = router;