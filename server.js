require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-route');
const adminRoutes = require('./routes/admin-route');
connectToDB();

const app = express();

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);


app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
})