const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const Note = require('./models/note')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connection to MongoDB successful")
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})