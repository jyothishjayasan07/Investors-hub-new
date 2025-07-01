const express =require('express');

const dotenv=require('dotenv');

const cors =require('cors')

const dbconnect=require('./Config/Db')
/* const router = express.Router(); */

dotenv.config()

dbconnect()
const app =express();

app.use(cors())

app.use(express.json())
const itemrouter=require('./Routes/authRoutes')

app.use('/',itemrouter)

/* app.use('/api/auth',require('./Routes/authRoutes'))

app.use('/api/adimin',require('./Routes/adminRoutes'))

app.use('/api/company',require('./Routes/companyRoutes'))

app.use('/api/investor',require('./Routes/investorRoutes')) */


const PORT=process.env.PORT||6000

app.listen(PORT,()=>{
    console.log('App is Running At 6000');
    
})

