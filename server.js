const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user',userRoutes);

connectDB();
const PORT = process.env.BACKEND_PORT

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
})
