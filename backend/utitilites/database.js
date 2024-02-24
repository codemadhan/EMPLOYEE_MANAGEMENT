import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'bnghwr2fr2qbtkftsph3-mysql.services.clever-cloud.com',
    user: 'um7nzzhwioxoj60p',
    database: 'bnghwr2fr2qbtkftsph3',
    password: '1UPCdEjkYBTWnspuwRYY',       
}).promise(); 

// Function to create tables if they do not exist
const createTables = async () => {
    try {
        // Create user table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS employee(
                employee_name VARCHAR(30) NOT NULL,
                employee_id BIGINT NOT NULL,
                department VARCHAR(255) NOT NULL,
                dob DATE NOT NULL,
                gender VARCHAR(30) NOT NULL, 
                designation VARCHAR(30) NOT NULL,
                salary BIGINT NOT NULL,
                blood_group VARCHAR(25) NOT NULL,
                experience INT NOT NULL,
                marital_status VARCHAR(5) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone_number BIGINT NOT NULL,
                joining_date DATE NOT NULL
            );
        `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Call the function to create tables
createTables();

export default pool;
