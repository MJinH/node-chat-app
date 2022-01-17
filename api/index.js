const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const database = require("./db/database")
const router = require("./routes/route")
dotenv.config()


app.use(express.json())
app.use(morgan("common"))
app.use(helmet())


app.use("/api",router)

const start = async () => {
    try {
        await database(process.env.MONGO_URL)
                .then(console.log("Connected to DB"))
        app.listen(8800, () =>
            console.log("Server is running")
        )
    } catch (err) {
        console.log(err)
    }
}


start()