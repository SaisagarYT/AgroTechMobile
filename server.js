const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const otpRoutes = require('./routes/otp.routes');
const diagnosisRoutes = require('./routes/diagnosis.routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/assets',express.static('public/assets'))

app.use('/api/user',userRoutes);
app.use('/api/v1',otpRoutes);
app.use('/api/v1',diagnosisRoutes);

connectDB();
const PORT = process.env.BACKEND_PORT

app.listen(PORT,() =>{
    console.log(`https://localhost:${PORT}`);
})
