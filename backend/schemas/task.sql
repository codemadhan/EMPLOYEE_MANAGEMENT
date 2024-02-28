CREATE TABLE tasks(
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    task TEXT NOT NULL,
    task_completion INT NOT NULL,
    progress INT NOT NULL 
);