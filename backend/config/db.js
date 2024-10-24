import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully connected to mongodb 🥂`)
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exist(1)
    }
}
export default connectdb