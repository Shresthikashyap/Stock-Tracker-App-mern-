const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const stockController = require('./controllers/stockController')
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : 'http://localhost:3000',// Allow the frontend origin
        methods: ["GET", "POST"],          // Specify allowed methods
        allowedHeaders: ["Content-Type"],   // Specify allowed headers
        credentials: true                   // Allow credentials if needed
    }
});

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('getStockData', (symbol) => {
        stockController.getStockData(symbol, io); // Fetch data for this symbol
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

