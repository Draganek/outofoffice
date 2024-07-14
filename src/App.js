import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import EmployeeList from './components/Employees/EmployeeList';
import LeaveRequestForm from './components/LeaveRequestForm';
import MainPage from './components/MainPage';
import EmployeesMenu from './components/Employees/EmployeesMenu';
import EditEmployee from './components/Employees/EditEmployee';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" >
                                <NavLink style={{padding: "8px"}} className="nav-link" to="/" activeClassName="active">Main</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{padding: "8px"}} className="nav-link" to="/employees" activeClassName="active">Employees</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink style={{padding: "8px"}} className="nav-link" to="/leave-request" activeClassName="active">Leave Request</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/employees/edit/:id" element={<EditEmployee />} />
                <Route path="/employees/*" element={<EmployeesMenu />} />
                <Route path="/leave-request" element={<LeaveRequestForm />} />
            </Routes>
        </Router>
    );
}

export default App;
