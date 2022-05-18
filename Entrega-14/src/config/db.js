import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
    err
        ? console.log("⛔ Error al conectarse a MongoDB")
        : console.log("🆗 Conectados a MongoDB")
})

export default mongoose;
