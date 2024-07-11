import React, { useState } from 'react';
import { db, auth } from '../firebase';

const LeaveRequestForm = () => {
    const [absenceReason, setAbsenceReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            await db.collection('leaveRequests').add({
                employee: user.uid,
                absenceReason,
                startDate,
                endDate,
                comment,
                status: 'New'
            });
            alert('Leave request submitted!');
        } else {
            alert('Please log in to submit a leave request.');
        }
    };

    return (
        <div>
            <h2>Submit Leave Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Absence Reason</label>
                    <input
                        type="text"
                        className="form-control"
                        value={absenceReason}
                        onChange={(e) => setAbsenceReason(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default LeaveRequestForm;
