CREATE TABLE employee(
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