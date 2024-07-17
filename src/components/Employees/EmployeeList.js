import React, { useState, useEffect, useMemo } from 'react';
import { database } from '../../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import ModalNotificationButton from '../ModalNotificationButton.js/ModalNotificationButton';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState({
        fullName: '',
        position: '',
        subdivision: '',
        status: '',
        peoplePartner: '',
    });

    const initialSortConfig = {
        key: '',
        direction: '',
    };

    const [sortConfig, setSortConfig] = useState(initialSortConfig);

    useEffect(() => {
        const employeesRef = ref(database, 'employees/');
        onValue(employeesRef, (snapshot) => {
            const data = snapshot.val();
            const employeeList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setEmployees(employeeList);
            setFilteredEmployees(employeeList); // Initial setting of filtered employees
        });
    }, []);

    const deleteEmployee = (employeeId) => {
        const employeeRef = ref(database, `employees/${employeeId}`);
        remove(employeeRef)
            .then(() => {
                console.log("Employee removed successfully.");
                // Remove employee from both employees and filteredEmployees
                setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
                setFilteredEmployees(prevFilteredEmployees => prevFilteredEmployees.filter(emp => emp.id !== employeeId));
            })
            .catch((error) => {
                console.error("Error removing employee: ", error);
            });
    };

    const handleGlobalFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setGlobalFilter(value);

        const filteredData = employees.filter(emp =>
            emp.fullName.toLowerCase().includes(value) ||
            emp.position.toLowerCase().includes(value) ||
            emp.subdivision.toLowerCase().includes(value) ||
            emp.status.toLowerCase().includes(value) ||
            emp.peoplePartner.toLowerCase().includes(value)
        );
        setFilteredEmployees(filteredData); // Update filtered employees on global filter change
    };

    const handleColumnFilterChange = (key, value) => {
        setColumnFilters({
            fullName: '',
            position: '',
            subdivision: '',
            status: '',
            peoplePartner: '',
        })
        setColumnFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));

        const filteredData = employees.filter(emp =>
            value === 'Any' || emp[key] === value
        );
        setFilteredEmployees(filteredData); // Update filtered employees on column filter change
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                direction = 'descending';
            } else if (sortConfig.direction === 'descending') {
                direction = '';
                key = '';
            }
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') return '🔼';
            if (sortConfig.direction === 'descending') return '🔽';
        }
        return (<button className='btn btn-primary btn-sm mb-1' style={{ padding: "0rem 0.25rem 0rem 0.25rem", marginLeft: "0.1rem", fontSize: "0.7rem" }}>Sort</button>);
    };

    const sortedEmployees = useMemo(() => {
        if (sortConfig.key) {
            return [...filteredEmployees].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return [...filteredEmployees];
    }, [filteredEmployees, sortConfig]);

    const columns = [
        { key: 'fullName', label: 'Full Name' },
        { key: 'position', label: 'Position' },
        { key: 'subdivision', label: 'Subdivision' },
        { key: 'status', label: 'Status' },
        { key: 'peoplePartner', label: 'People Partner' },
    ];

    return (
        <div className="container mt-4">
            <h2>Employee List</h2>
            <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={handleGlobalFilterChange}
                className="form-control mb-3"
            />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((col, index) => (
                            <th key={index}>
                                {col.label}
                                <span className="btn p-0 m-0" onClick={() => handleSort(col.key)}>
                                    {getSortIcon(col.key)}
                                </span>
                                <div className="d-flex align-items-center">
                                    {col.key !== "fullName" && (
                                        <select
                                            value={columnFilters[col.key]}
                                            onChange={(e) => handleColumnFilterChange(col.key, e.target.value)}
                                            className="form-select me-2"
                                        >
                                            <option value="Any">Any</option>
                                            {[...new Set(employees.map(emp => emp[col.key]))].map((value, index) => (
                                                <option key={index} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </th>
                        ))}
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.fullName}</td>
                            <td>{employee.position}</td>
                            <td>{employee.subdivision}</td>
                            <td>{employee.status}</td>
                            <td>
                                {employee.peoplePartner === "null" ?
                                    "Not selected" :
                                    `${(Object.values(employees).find(element => element.id === employee.peoplePartner)?.fullName || "Not found")} (${employee.peoplePartner})`
                                }
                            </td>
                            <td>
                                <NavLink className='btn btn-warning me-2' to={`/employees/edit/${employee.id}`}>Edit</NavLink>
                                <ModalNotificationButton buttonText="Delete" onConfirm={() => deleteEmployee(employee.id)} message={`Are you sure you want to delete employee ${employee.fullName}?`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
