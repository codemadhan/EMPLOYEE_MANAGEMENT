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

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
}

