# Employee Tracker

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Employee Treacker is a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL. Using this application a business owner will be able to view and manage the departments, roles, and employees in company, thus can organize and plan business.

Features of the application include
* Start the application, user is presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role, exit.
* On choosing view all departments, user is presented with a formatted table showing department names and department ids.
* On choosing view all roles, user is presented with the job title, role id, the department that role belongs to, and the salary for that role.
* On choosing view all employees, user is presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
* On choosing add a department, user is prompted to enter the name of the department and that department is added to the database.
* On choosing to add a role, user is prompted to enter the name, salary, and department for the role and that role is added to the database.
* On choosing to add an employee, user is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
* On choosing to update an employee role, user is prompted to select an employee to update and their new role and this information is updated in the database.
* On choosing exit, the process is finished.

## Application database schema

Design of the database schema is as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

## Application Demo Url

Below is link for demo of the application.

[Employee Tracker Demo](https://drive.google.com/file/d/1cVxW23GsDc42y_NAE3ZHhbcfeYpmMWrr/view)