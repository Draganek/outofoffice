import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';

const inputStyle = {
    backgroundColor: '#f8f9fa', // jasnoszare tło
    borderColor: '#ced4da',
    color: '#495057'
};

const EmployeeForm = ({ employee, handleSubmit, handleChange, tittle }) => {
    const [Partners, setPartners] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const subdivision = ["Division", "Another division"];
    const positions = ["Frontend", "Fullstack", "Backend", "HR Manager"];

    useEffect(() => {
        const employeesRef = ref(database, 'employees/');
        onValue(employeesRef, (snapshot) => {
            const data = snapshot.val();
            const employeeList = data
                ? Object.keys(data)
                    .map(key => ({ id: key, ...data[key] }))
                    .filter(employee => employee.position === 'HR Manager') // Filtruj pracowników
                : [];
            setPartners(employeeList);
        });
    }, []);

    useEffect(() => {
        const checkIsFilled = () => {
            const { fullName, position, subdivision, status, peoplePartner, outOfOfficeBalance } = employee;
            setIsFilled(
                fullName &&
                position &&
                subdivision &&
                status &&
                peoplePartner &&
                outOfOfficeBalance !== ""
            );
        };
        checkIsFilled();
    }, [employee]);

    return (
        <form onSubmit={handleSubmit} className="text-start p-4" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="container">
                <h2 className="text-center">{tittle}</h2>
                <div className="mb-3 mt-5">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={employee.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        style={inputStyle}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <select
                        className="form-select"
                        id="position"
                        name="position"
                        value={employee.position} // Ustawienie domyślnej wartości
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">{'<Choose>'}</option>
                        {positions.map(element => (
                            <option key={element} value={element}>{element}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="subdivision" className="form-label">Subdivision</label>
                    <select
                        className="form-select"
                        id="subdivision"
                        name="subdivision"
                        value={employee.subdivision} // Ustawienie domyślnej wartości
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">{'<Choose>'}</option>
                        {subdivision.map(element => (
                            <option key={element} value={element}>{element}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={employee.status || 'Active'} // Ustawienie domyślnej wartości
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="peoplePartner" className="form-label">People Partner</label>
                    <select
                        className="form-select"
                        id="peoplePartner"
                        name="peoplePartner"
                        value={employee.peoplePartner} // Ustawienie domyślnej wartości
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">{'<Choose>'}</option>
                        {Partners.map(element => (
                            <option key={element.id} value={element.id}>{element.fullName}</option>
                        ))}
                        <option value="null">Not elected</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="outOfOfficeBalance" className="form-label">Out of Office Balance</label>
                    <input
                        type="number"
                        className="form-control"
                        id="outOfOfficeBalance"
                        name="outOfOfficeBalance"
                        value={employee.outOfOfficeBalance}
                        onChange={handleChange}
                        placeholder="Enter out of office balance"
                        style={inputStyle}
                    />
                </div>
                <div className='d-flex flex-column'>
                <button style={{fontSize: "1.8rem"}} type="submit" disabled={!isFilled} className="btn btn-primary w-100"><b>Submit</b></button>
                {!isFilled && (<span className='alert alert-warning alert-dismissible mt-2 p-2 text-center'>Fill in all fields</span>)}
                </div>
            </div>
        </form>
    );
}

export default EmployeeForm;
