const inquirer = require('inquirer');
const cTable = require('console.table');
const { GetDepartments, GetRoles, GetEmployees, AddDepartment, AddRole, AddEmployee, UpdateEmployee} = require('./utils');

let currentState = 'view'
// const features = [
//     {key:1, value:'View All Departments'},
//     {key:2, value:'View All Roles'},
//     {key:3, value:'View All Employees'},
//     {key:4, value:'Add a department'},
//     {key:5, value:'Add a role'},
//     {key:6, value:'Add an employee'},
//     {key:7, value:'Update an Employee'},
//     {key:8, value:'Exit'},
// ];

const features = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an Employee',
    'Exit'
];

getQuestions = (state) => {
    let questions = [];
    switch (state) {
        case 'view':
            questions.push({
                type: 'list',
                name: 'next',
                message: 'What would you like to do?',
                choices: features
              });
            break;
        default:
            break;
    }
    return questions;
}

askQuestions = ()=>{
    inquirer
    .prompt(getQuestions(currentState))
    .then((answers) => {
      nextProcess(answers);
    });
  };

  nextProcess = async (answers) => {
    const {next} = answers;

    if(next == 'View All Departments')
    {
        await ViewAllDepartments();
        currentState ='view';
        askQuestions(currentState);
    }

    if(next == 'View All Roles')
    {
        await ViewAllRoles();
        currentState ='view';
        askQuestions(currentState);
    }

    if(next == 'View All Employees')
    {
        await ViewAllEmployees();
        currentState ='view';
        askQuestions(currentState);
    }

    if(next == 'Add a department')
    {
        currentState ='dept';
        inquirer
            .prompt({
                type: 'input',
                name: 'name',
                message: 'Enter department Name',
              })
            .then((answers) => {
                AddDepart(answers)
            });
    }

    if(next == 'Add a role')
    {
        currentState ='role';
        const depts = await GetDepartments();
        inquirer
            .prompt([{
                type: 'input',
                name: 'title',
                message: 'Enter Name of the role',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Enter salary of the role',
              },
              {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: depts
              }])
            .then((answers) => {
                InsertRole(answers,depts)
            });
    }

    if(next == 'Add an employee')
    {
        currentState ='employee';
        const roles = await GetRoles();
        const emps = await GetEmployees();
        let r = roles.map(r=>r['Job Title']);
        let e = emps.map(r=>`${r['First Name']} ${r['Last Name']}`);
        inquirer
            .prompt([{
                type: 'input',
                name: 'first_name',
                message: 'What is employee\'s first name?',
              },
              {
                type: 'input',
                name: 'last_name',
                message: 'What is employee\'s last name?',
              },
              {
                type: 'list',
                name: 'roletitle',
                message: 'What is employee\'s role?',
                choices: r
              },
              {
                type: 'list',
                name: 'managername',
                message: 'What is employee\'s manager?',
                choices: e
              }
            ])
            .then((answers) => {
                InsertEmp(answers,roles,emps)
            });
    }

    if(next == 'Update an Employee')
    {
        currentState ='employee';
        const roles = await GetRoles();
        const emps = await GetEmployees();
        let r = roles.map(r=>r['Job Title']);
        let e = emps.map(r=>`${r['First Name']} ${r['Last Name']}`);
        inquirer
            .prompt([
              {
                type: 'list',
                name: 'empname',
                message: 'Which employee\'s role you want to update?',
                choices: e
              },
              {
                type: 'list',
                name: 'roletitle',
                message: 'Which role do you want to assign the selected employee?',
                choices: r
              }
            ])
            .then((answers) => {
                UpdateEmp(answers,roles,emps)
            });
    }

    if(next == 'Exit')
    {
        currentState ='view';
        console.log('Process finished!')
    }
  }

  const ViewAllDepartments = async () =>{
    let dep = await GetDepartments();
    console.log("List of Departments");
    console.table(dep);
  };

  const ViewAllRoles = async () =>{
    let dep = await GetRoles();
    console.log("List of Roles");
    console.table(dep);
  };

  const ViewAllEmployees = async () =>{
    let dep = await GetEmployees();
    console.log("List of Employees");
    console.table(dep);
  };

  const AddDepart = async (answers) =>{
    let dep = await AddDepartment(answers);
    console.log(`Added ${answers.name} department`);
    currentState ='view';
    askQuestions(currentState);
  };

  const InsertRole = async (answers,depts) => {
      
    const {title,salary,department} = answers;
      
    const dep = depts.filter((element) => element.name == department )

      let newRole = {
        title:title,salary : parseFloat(salary),department_id:dep[0]['Department Id']
      };

    let res = await AddRole(newRole);
    console.log(`Added ${answers.title} role`);
    currentState ='view';
    askQuestions(currentState);
  };

  const InsertEmp = async (answers,roles,emps) => {
     
    console.log(answers);
    const {first_name,last_name,roletitle,managername} = answers;
     const role = roles.filter((element) => element['Job Title'] == roletitle );
     const manager = emps.filter((element) => `${element['First Name']} ${element['Last Name']}` == managername );

      let newEmp = {
        first_name:first_name,last_name : last_name,role_id:role[0]['Role id'],manager_id:manager[0]['Employee id']
      };

     let res = await AddEmployee(newEmp);
    console.log(`Added employee!`);
    currentState ='view';
    askQuestions(currentState);
  };

  const UpdateEmp = async (answers,roles,emps) => {
     
    console.log(answers);
    const {empname,roletitle} = answers;
     const role = roles.filter((element) => element['Job Title'] == roletitle );
     const emp = emps.filter((element) => `${element['First Name']} ${element['Last Name']}` == empname );

      let newEmp = {
        id:emp[0]['Employee id'],role_id:role[0]['Role id']
      };
      console.log(newEmp);

     let res = await UpdateEmployee(newEmp);
    console.log(`Updated employee role!`);
    currentState ='view';
    askQuestions(currentState);
  };

  // TODO: Create a function to initialize app
  function init() {
    askQuestions(currentState);
  }
  
  // Function call to initialize app
  init();
