const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./models");
const singerRoutes = require("./routes/singer");
const songRoutes = require("./routes/song");
const authRoutes = require("./routes/auth")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/singer", singerRoutes);
app.use("/api/song", songRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8081;
app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`)
})