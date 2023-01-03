const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
  }
  
  const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'Malformatted id' })
    } 
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token'
      })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired'
      })
    }


    next(error)
  }
  
  module.exports = {
    unknownEndpoint,
    errorHandler
  }