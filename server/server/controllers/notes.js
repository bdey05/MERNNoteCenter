const notesRouter = require ('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Note = require('../models/note')
const User = require('../models/user')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.delete('/:id', async (req, res, next) => {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const deletedNote = await Note.findByIdAndRemove(req.params.id)
    console.log(user.notes)
    user.notes = user.notes.filter((note) => 
    {
      note.id !== deletedNote.id
    })
    await user.save()
    res.status(204).end()
    
})

notesRouter.post('/', async (req, res) => {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }
    if (body.title === undefined || body.content === undefined) {
        return res.status(400).json({ error: 'Title or content missing' })
    }
    const user = await User.findById(decodedToken.id)

    const note = new Note({
        title: body.title,
        content: body.content,
        date: new Date(),
        user: user._id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(201).json(savedNote)
})

notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter