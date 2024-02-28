import pool from '../utitilites/database.js';

export const submit = async (req , res) => {
    try{
        const {name,employeeId ,department, dob , gender, designation, salary , blood_group,experience ,marital_status, email , phone_number, joining_date} = req.body;
        if (!name|| !employeeId || !department || !dob || !gender || !designation || !salary || !blood_group || !experience || !marital_status || !email || !phone_number || !joining_date) {
            console.log('incomplete data');
            return res.status(400).json({ message: 'Incomplete data' });
        }
        if (name.length > 30 || salary.length > 8) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const [result] = await pool.query('INSERT INTO employee (employee_name,employee_id ,department, dob , gender, designation, salary , blood_group,experience ,marital_status, email , phone_number, joining_date) VALUES(?, ? , ? , ? , ? , ? ,? , ? , ? , ? , ? , ? , ?)' , [name,employeeId ,department, dob , gender, designation, salary , blood_group,experience ,marital_status, email , phone_number, joining_date]);

        res.json({message : 'Form Submitted'});
        console.log('Form submitted');

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}

export const getData = async (req , res) => {
    try{
        const [result] = await pool.query('SELECT * FROM employee');

        res.status(200).send(result);

        return;
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal server error'});
    }
}

export const createTask = async (req , res) => {
    try{
        const employee_id = req.params.id;

        const {task ,task_completion , progress} = req.body;

        const [result] = await pool.query('INSERT INTO tasks (employee_id , task ,task_completion , progress) VALUES(?, ? , ? , ?)', [employee_id , task ,task_completion , progress]);

        res.status(200).json({message : 'Task Created'});
        console.log('Task completed');
        return;
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal server error'});
    }
}

export const getTaskbyID = async (req, res) => {
    try{
        const employee_id = req.params.id;

        const [task] = await pool.query('SELECT * FROM tasks WHERE employee_id = ?', [employee_id]);

        res.status(200).json(task);

        console.log('Response sent');
        return;
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'internal server error'});
    }
} 

export const updateStatus = async (req, res) => {
    try{
        const task_id = req.params.id;
        
        const {task , task_completion, progress} = req.body;

        const [result] = await pool.query('UPDATE tasks SET task_completion = ?, progress = ? WHERE task_id = ?', [task_completion,progress,task_id]);

        res.status(200).json({message : 'Task Status updated'});
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'INternal Server Error'});
    }
}

export const updateProgress = async (req, res) => {
    try{
        const task_id = req.params.id;
        const {progress} = req.body;

        const [result] = await pool.query('UPDATE tasks SET progress = ? WHERE task_id = ?', [progress , task_id]);

        res.status(200).json({message : 'Progress Updated'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}