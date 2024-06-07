import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose'; // lets us connect to database and interact with it

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express() // creates an express app
app.use(express.json()) // helps convert the body of api request to convert to json format automatically
app.use(express.urlencoded({extended: true})) // helps parse end url
app.use(cors()) 

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({message: "hello from express"});
});

app.listen(5000, ()=>{
    console.log("server running");
})