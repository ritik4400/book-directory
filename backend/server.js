const express = require('express');
const connectDB = require('./src/config/db');
const dotenv =  require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./src/routes/bookRoutes');
const errorHandler = require('./src/middleware/errorhandler');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/book',bookRoutes);
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("system working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`); 
})