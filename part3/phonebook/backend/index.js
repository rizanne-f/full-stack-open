require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan('tiny', {
    skip: function (request, response) {
        return request.method === 'POST'
    }
}))

morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time mss :body', {
    skip: function (request, response) {
        return request.method !== 'POST'
    }
}))

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// return all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(404).json({
            error: `No person with id ${id} is found.`
        })
    }

    response.status(200).json(person)
})

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
    
    // const isDuplicate = persons.map(p => p.name.toLowerCase())
    //     .includes(request.body.name.toLowerCase())
    
    // if (isDuplicate) {
    //     return response.status(409).json({
    //         error: "Name must be unique"
    //     })
    // }

    const newPerson = new Person({
        id: Math.ceil(Math.random() * 1_000_000),
        name: body.name,
        number: body.number
    })
    newPerson.save().then(savedPerson => {
        response.status(201).json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>
    `)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})