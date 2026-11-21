require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

// set middleware for POST requests
app.use(morgan('tiny', {
    skip: function (request, response) {
        return request.method === 'POST'
    }
}))

// set middleware for non-POST requests
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time mss :body', {
    skip: function (request, response) {
        return request.method !== 'POST'
    }
}))

// return all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

// return single person
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).json({
                    error: `No person with id ${id} is found.`
                })
            }
            response.status(200).json(person)
        })
})

// delete a person
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})

// add new person
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Missing required fields"
        })
    }
    
    Person.findOne({ name: { $regex: `^${body.name.trim()}$`, $options: 'i' } })
        .then(existingPerson => {
            if (existingPerson) {
                return res.status(400).json({
                    error: "name must be unique."
                })
            }

            const newPerson = new Person({
                id: Math.ceil(Math.random() * 1_000_000),
                name: body.name,
                number: body.number
            })
            newPerson.save().then(savedPerson => {
                response.status(201).json(savedPerson)
            })
        })
})

// update person entry
app.put('/api/persons/:id', (request, response) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            
            person.number = number

            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
})

// return info page
app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const label = count === 1 ? '1 person' : `${count} people`
            response.send(
                `<div>Phonebook has info for ${label}</div><div>${new Date()}</div>`
            )
        })
})

// error handler middleware
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

// run server on port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})