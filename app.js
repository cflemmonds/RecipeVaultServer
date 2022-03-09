require("dotenv").config()
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
app.use(require('./middleware/headers'));

app.use(Express.json())

const controllers = require('./controllers');
app.use("/user", controllers.userController);
app.use(require("./middleware/validateSession"));
app.use("/pantry", controllers.pantryController);
app.use('/posts', controllers.postsController);
app.use('/comments', controllers.commentsController);

dbConnection.authenticate()
    .then(()=> dbConnection.sync({force: true}))
    .then(()=> {
        // app.listen(process.env.PORT, ()=> {
        //     console.log(`[Server]: Recipe Vault is listening on {process.env.PORT}.`)
        // })

        app.listen(3000, () => {
            console.log(`[Server]: Recipe Vault is listening on 3000`);
        });
    })
    .catch((err)=> {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })

// app.use('/test', (req ,res) => {
//     res.send("This is a message from the test endpoint on the server!")
// })
