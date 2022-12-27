const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(result => {
        console.log("Connection successful")
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)

