const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./models");
const singerRoutes = require("./routes/singer")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/singer", singerRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`)
})