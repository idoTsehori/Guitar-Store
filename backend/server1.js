const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').createServer(app)
// const guitarService = require('./services/guitar.service')

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
const guitarRoutes = require('./api/guitar/guitar.routes')

// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
app.use('/api/guitar', guitarRoutes)

// app.listen(port, () => {
//   console.log(`guitarApp listening on: http://localhost:${port}`)
// })

// app.get('/api/guitar', (req, res) => {
//   console.log('req.query.filterBy', req.query.filterBy)
//   const filterBy = {
//     name: req.query.filterBy?.name || '',
//     // labels: req.query.labels || [],
//     inStock: JSON.parse(req.query.filterBy?.inStock || 'false'),
//     sortBy: req.query.sortBy?.by || {},
//     // page: req.query.page || 0,
//   }
//   guitarService
//     .query(filterBy)
//     .then((guitars) => {
//       res.status(201).send(guitars)
//     })
//     .catch((err) => {
//       console.log('Backend had error: ', err)
//       res.status(401).send('Failed to get guitars')
//     })
// })

// app.get('/api/guitar/:guitarId', (req, res) => {
//   const { guitarId } = req.params
//   guitarService
//     .getById(guitarId)
//     .then((guitar) => {
//       res.status(201).send(guitar)
//     })
//     .catch((err) => {
//       console.log('Backend had error: ', err)
//       res.status(401).send(`Failed to get guitar with id: ${guitarId}`)
//     })
// })

// app.post('/api/guitar', (req, res) => {
//   const guitarToSave = {
//     name: req.body.name,
//     price: req.body.price,
//     labels: req.body.labels,
//     inStock: req.body.inStock,
//   }
//   guitarService
//     .save(guitarToSave)
//     .then((savedGuitar) => {
//       res.status(201).send(savedGuitar)
//     })
//     .catch((err) => {
//       console.log('Backend had error: ', err)
//       res.status(401).send('Cannot create guitar')
//     })
// })

// app.put('/api/guitar/:guitarId', (req, res) => {
//   const guitarToSave = {
//     _id: req.body._id,
//     name: req.body.name,
//     price: req.body.price,
//     labels: req.body.labels,
//     inStock: req.body.inStock,
//     createdAt: req.body.createdAt,
//   }
//   guitarService
//     .save(guitarToSave)
//     .then((savedGuitar) => {
//       res.status(201).send(savedGuitar)
//     })
//     .catch((err) => {
//       console.log('Backend had error: ', err)
//       res.status(401).send('Cannot remove guitar')
//     })
// })

// app.delete('/api/guitar/:guitarId', (req, res) => {
//   const { guitarId } = req.params
//   guitarService
//     .remove(guitarId)
//     .then(() => {
//       res.send('OK, deleted')
//     })
//     .catch((err) => {
//       console.log('Error:', err)
//       res.status(400).send('Cannot remove guitar')
//     })
// })

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue-router to take it from there

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030
http.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
