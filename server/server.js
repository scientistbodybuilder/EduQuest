import dotenv from "dotenv";
import 'dotenv/config'; 
dotenv.config();
import express from "express"
import cors from "cors"

//Routes
import quizRouter from "./src/routes/quizRoutes.js"

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*',
}));


app.use("/api", quizRouter)

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });