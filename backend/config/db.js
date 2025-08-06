const { mongo, default: mongoose } = require("mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB