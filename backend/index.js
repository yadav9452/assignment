const express = require("express");
const app= express();
const cors = require("cors");
const { connectToDb } = require("./connectToDb/connection");
const { studentRouter } = require("./routes/student.routes");
const { adminRouter } = require("./routes/admin.routes");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

app.listen(PORT,async()=>{
    await connectToDb();
    console.log(`server is running at ${PORT}`);
})