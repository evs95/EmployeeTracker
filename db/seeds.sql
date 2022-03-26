INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",100000,4),
       ("Developer",150000,1),
       ("Account Manager",160000,2),
       ("Lawyer",190000,3),
       ("Salesperson",80000,4),
       ("Accountant",125000,2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John", "Deo", 1, NULL),
       ("Kunal", "Singh", 3, Null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mike", "Chan", 5, 1),
       ("Malia", "Brown", 6, 2);