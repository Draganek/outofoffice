import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';
import EmployeeForm from './EmployeeForm';

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        id: '',
        fullName: '',
        position: '',
        subdivision: '',
        status: 'Active',
        peoplePartner: '',
        outOfOfficeBalance: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const employeesRef = ref(database, `employees/${id}`);

        onValue(employeesRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setEmployee({
                    id: id,
                    fullName: data.fullName || '',
                    position: data.position || '',
                    subdivision: data.subdivision || '',
                    status: data.status || 'Active',
                    peoplePartner: data.peoplePartner || '',
                    outOfOfficeBalance: data.outOfOfficeBalance || ''
                });
            } else {
                console.log(`Employee with ID ${id} not found`);
            }
        });

    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', employee);

        const { id, ...employeeData } = employee;

        if (id) {
            const employeeRef = ref(database, `employees/${id}`);
            update(employeeRef, employeeData)
                .then(() => {
                    alert('Employee updated successfully');
                    navigate('/employees');
                })
                .catch((error) => {
                    console.error('Error updating employee: ', error);
                });
        } else {
            console.error('Employee id is missing');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='mt-5'>
            <EmployeeForm
                title={"Edit Employee"}
                employee={employee}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </div>
    );
};

export default EditEmployee;
