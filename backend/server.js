import express from 'express';
import pool from './utitilites/database.js';
import FormRouter from './routers/formRouter.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

pool.getConnection((err , connection) => {
    if(err){
        console.error('Error connecting to the database' , err.stack);
    }
    console.log('Connected to the database');
    connection.release();
});

app.use('/form' , FormRouter);

app.listen(8000 , () => {
    console.log('Server is running at port 8000');
})