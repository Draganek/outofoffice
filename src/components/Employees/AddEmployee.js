import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, push, onValue } from 'firebase/database';
import EmployeeForm from './EmployeeForm';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        fullName: '',
        position: '',
        subdivision: '',
        status: 'Active',
        peoplePartner: '',
        outOfOfficeBalance: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', employee);

        // Dodaj pracownika do bazy danych
        const employeesRef = ref(database, 'employees/');
        push(employeesRef, employee)
            .then(() => {
                // Opcjonalnie: zresetuj formularz lub wykonaj inne działania po dodaniu
                setEmployee({
                    fullName: '',
                    position: '',
                    subdivision: '',
                    status: '',
                    peoplePartner: '',
                    outOfOfficeBalance: ''
                });
            })
            .catch((error) => {
                console.error('Error adding employee: ', error);
            });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <EmployeeForm
            employee={employee}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
};

export default AddEmployee;
