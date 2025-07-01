import express from "express";
import routes from '../routes/routes.js'

const app = express();

//Routing
/* app.get('/', routes);
app.post('/', routes);
app.get('/faq', routes); */
app.use('/', routes);

//app.use('/', routes)


const port = 4000;
app.listen(port, () => {
    console.log(`Listen ${port}`);
});