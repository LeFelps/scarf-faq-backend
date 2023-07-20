import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import faqRoutes from './routes/faq'

const app = express();
const PORT = process.env.PORT;

const databaseUri = process.env.DB_URI || ""

mongoose.connect(databaseUri);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/faq', faqRoutes)

app.listen(PORT, () => console.log(`Server running on PORT: http://localhost:${PORT}`))