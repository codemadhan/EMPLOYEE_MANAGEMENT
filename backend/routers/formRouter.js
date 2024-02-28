import express from 'express';
import { submit, getData, createTask, getTaskbyID, updateStatus, updateProgress } from '../controller/formController.js';

const router = express.Router();

router.post('/submit', submit);
router.get('/getData', getData);
router.post('/createTask/:id', createTask);
router.get('/getTaskbyID/:id', getTaskbyID);
router.put('/updateStatus/:id', updateStatus);
router.put('/updateProgress/:id', updateProgress);

export default router;
