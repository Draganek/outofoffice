import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import EmployeeForm from './EmployeeForm';
import { NavLink } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const employeesRef = ref(database, 'employees/');
        onValue(employeesRef, (snapshot) => {
            const data = snapshot.val();
            const employeeList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setEmployees(employeeList);
        });
    }, []);

    const deleteEmployee = (employeeId) => {
        const employeeRef = ref(database, `employees/${employeeId}`);
        remove(employeeRef)
            .then(() => {
                console.log("Employee removed successfully.");
                // Możesz tutaj zaktualizować stan aplikacji, np. usunąć pracownika z listy w stanie
            })
            .catch((error) => {
                console.error("Error removing employee: ", error);
            });
    };

    return (
        <div>
            <div className="container mt-4">
                <h2>Employee List</h2>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Position</th>
                            <th>Subdivision</th>
                            <th>Status</th>
                            <th>People Partner</th>
                            <th>Out of Office Balance</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.fullName}</td>
                                <td>{employee.position}</td>
                                <td>{employee.subdivision}</td>
                                <td>{employee.status}</td>
                                <td>{employee.peoplePartner}</td>
                                <td>{employee.outOfOfficeBalance}</td>
                                <td>
                                    <NavLink className='btn btn-warning' to={`/employees/edit/${employee.id}`}>Edit</NavLink>
                                    <button className='btn btn-primary' onClick={() => deleteEmployee(employee.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
