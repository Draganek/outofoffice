import React from 'react';
import { Route, Routes, NavLink, useLocation, Link} from 'react-router-dom';
import { matchPath } from 'react-router';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';

const EmployeesMenu = () => {
    const { pathname  } = useLocation();
    const isActive = !!matchPath(pathname, '/employees');

    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive ? 'active' : ''}`} to={'/employees/'}>List</Link>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/employees/add_worker'}>Add Employee</NavLink>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <Routes>
                    <Route path={'/'} element={<EmployeeList />} />
                    <Route path="/add_worker" element={<AddEmployee />} />
                </Routes>
            </div>
        </div>
    );
};

export default EmployeesMenu;
