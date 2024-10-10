const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const stockController = require('./controllers/stockController');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import path module

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : 'http://localhost:3000',
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Server not set to production'));
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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
