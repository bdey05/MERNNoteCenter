const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>App Home</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => { res.json(notes) })
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/notes', (req, res) => {
    console.log(req)
    const body = req.body
    if (body.title === undefined || body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const note = new Note({
        title: body.title,
        content: body.content,
        date: new Date(),
    })
    note.save().then(addedNote => { res.json(addedNote) })
})

app.put('/api/notes/:id', (req, res, next) => {
    const { title, content } = req.body
  
    Note.findByIdAndUpdate(req.params.id,
      { title, content },
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedNote => {
        res.json(updatedNote)
      })
      .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'Malformatted id' })
    } 

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})