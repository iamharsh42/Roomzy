import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";

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