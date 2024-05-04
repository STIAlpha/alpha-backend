require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'auth.html'));
  });
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
})
app.get('/get-upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sample.html'));
  });

app.use('/uploads', express.static('uploads'))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/members', require('./routes/membersRoutes'))
app.use('/wildirft', require('./routes/wildriftRoutes'))
app.use('./chess', require('./routes/chessRoutes'))
app.use('./mlbb', require('./routes/mLBBRoutes'))
app.use('./lol', require('./routes/lolRoutes'))
app.use('/attendance', require('./routes/attendanceRoutes'))
app.use('/ITQuizBee', require('./routes/ITquizbeeRoutes'))
app.use('/CSQuizBee', require('./routes/CSquizbeeRoutes'))
app.use('/events', require('./routes/eventRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
//app.use('/webdev', require('./routes/webdevRoutes'))



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})


mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})