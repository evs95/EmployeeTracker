const mysql = require('mysql2/promise');

const GetDepartments = async () =>{
  // Connect to database
const db = await CreateMySqlConnection();
const sql = `SELECT id AS 'Department Id', name FROM department`;
const [rows, fields] = await db.execute(sql);
return rows;
}

const GetRoles = async () =>{
  // Connect to database
const db = await CreateMySqlConnection();
const sql = `SELECT r.title AS 'Job Title', r.id AS 'Role id', d.name AS 'Department', r.salary AS 'Salary' FROM role r JOIN department d ON r.department_id=d.id ORDER BY r.id ASC`;
const [rows, fields] = await db.execute(sql);
return rows;
}

const GetEmployees = async () =>{
  // Connect to database
const db = await CreateMySqlConnection();
const sql = `SELECT e.id AS 'Employee id',e.first_name AS 'First Name', e.last_name AS 'Last Name', r.title AS 'Job Title', d.name AS 'Department', r.salary AS 'Salary', (SELECT concat(m.first_name,' ', m.last_name) FROM employee m where m.id=e.manager_id ) AS 'Manager Name' FROM employee e JOIN  role r ON e.role_id=r.id JOIN  department d ON r.department_id=d.id ORDER BY e.id ASC`;
const [rows, fields] = await db.execute(sql);
return rows;
}

const AddDepartment = async (data) =>{
  const {name} = data;
  const params = [name];
  const db = await CreateMySqlConnection();
  const sql = 'INSERT INTO department(name) VALUES (?)';
  const [rows, fields] = await db.execute(sql,params);
  return rows;
}

const AddRole = async (data) =>{
  const {title,salary,department_id} = data;
  const params = [title,salary,department_id];
  const db = await CreateMySqlConnection();
  const sql = 'INSERT INTO role(title,salary,department_id) VALUES (?,?,?)';
  const [rows, fields] = await db.execute(sql,params);
  return rows;
}

const AddEmployee = async (data) =>{
  const {first_name,last_name,role_id,manager_id} = data;
  const params = [first_name,last_name,role_id,manager_id];
  const db = await CreateMySqlConnection();
  const sql = 'INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)';
  const [rows, fields] = await db.execute(sql,params);
  return rows;
}

const UpdateEmployee = async (data) =>{
  const {id,role_id} = data;
  const params = [role_id,id];
  const db = await CreateMySqlConnection();
  const sql = 'UPDATE employee SET role_id = (?) WHERE ID = (?)';
  const [rows, fields] = await db.execute(sql,params);
  return rows;
}

const CreateMySqlConnection = async () =>{
return await  mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'company_db'
    }
);
};

module.exports = {GetDepartments, GetRoles, GetEmployees, AddDepartment, AddRole, AddEmployee, UpdateEmployee};