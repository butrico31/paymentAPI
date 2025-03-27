const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./Routes/authRoutes");
const express = require("express");
const auth = require("./middlewares/authMiddleware");
const paymentRoutes = require("./Routes/paymentRoutes");


dotEnv.config();

const corsOptions = {
    credentials: true,
    origin: '*'
}

const app = express();


app.use(express.json());


app.use(cors(corsOptions));

mongoose.connect(process.env.CONN);

app.use(auth.autenticar);


app.use("/auth", authRoutes);

app.use("/pay", paymentRoutes);

app.listen(process.env.PORT);