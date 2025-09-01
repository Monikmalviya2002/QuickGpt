import express from "express"; 
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/database.js";

const app = express();


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,

};
app.use(cors(corsOptions));
app.use(express.json());


connectDB()
.then(()=>{
    console.log("✅ DATABASE connection is succesfull");


app.listen(7777,()=>{
    console.log("✅ server is active");
})
})

.catch(()=>{
    console.log("❌DATABASE connection is failed");
})