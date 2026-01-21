require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Mongo error:", err));

app.use("/tasks", require("./routes/taskRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});