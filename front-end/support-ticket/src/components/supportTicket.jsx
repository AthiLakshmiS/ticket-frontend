import React, {useState, useEffect} from "react";
import Sidebar from "../layouts/sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/ticket.scss';

function SupportTicket() {

    const currentDate = new Date().toISOString().split('T')[0];

    const [details, setDetails] = useState({
        topic: '',
        dateCreated: currentDate,
        severity: '',
        type: '',
        assignedTo: '',
        status: 'New',
        resolvedOn: '',
        description: ''
    })
    
    const validateDate = (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    };

    const resolvedeDate = (date) => {
        // Date is optional and considered valid if empty
        console.log(date);
        if(date) {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());    
        }
    };

    const validateSeverity = (severity) => {
        const parsedSeverity = parseInt(severity, 10);
        return !isNaN(parsedSeverity) && parsedSeverity >= 1 && parsedSeverity <= 5;
    };

    const updateDetails = (element) => {
        const {name, value} = element;
        setDetails({
            ...details,
            [name]: value
        })
        console.log(value);
    }

    const submitDetails = async (e) => {
        e.preventDefault();

        const validationChecks = [
            { field: 'Topic', value: details.topic, message: 'is required' },
            { field: 'Severity', value: details.severity, message: 'is required' },
            { field: 'Type', value: details.type, message: 'is required' },
            { field: 'Date Created', value: details.dateCreated, message: "is required or invalid", validator: validateDate },
            // { field: 'Resolved On', value: details.resolvedOn, message: 'is invalid', validator: resolvedeDate },
            { field: 'Severity', value: details.severity, message: 'is invalid', validator: validateSeverity },
        ];

        let isValid = true;

        for (const { field, value, message, validator } of validationChecks) {
            if (!value.trim()) {
                toast.error(`${field} ${message}`);
                isValid = false;
                break; // Stop validation on the first error
            } else if (validator && !validator(value)) {
                toast.error(`Invalid ${field} ${message}`);
                isValid = false;
                break; // Stop validation on the first error
            }
        }

        if (isValid) {
            console.log(details, JSON.stringify(details));
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(details);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/support-tickets", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                toast.success('Ticket Created');
            })
            .catch(error => console.log('error', error));       
        }
    }

    const fetchUser = async () => {
        
        try {
            const response = await fetch('http://localhost:8000/api/assigned-users', {
              method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            setDetails({
                ...details,
                assignedTo: data.data.user.name ? data.data.user.name : "",
                status: data.data.user.name ? "Assigned" : "New",
            })
        } catch (error) {
            console.error('Error adding Agent:', error.message);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])

    return (
        <div className="website">
            <div>
                <Sidebar />
            </div>
            <div>
                <h3>Support Ticket Creation</h3>
                <div className="ticket-creation">
                    <div className="ticket-details">
                        <label>
                            Topic 
                            <span className="required">*</span>
                        </label>
                        <input value={details.topic} name="topic" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Date created
                            <span className="required">*</span>
                        </label>
                        <input value={details.dateCreated} name="dateCreated" onChange={(e) => updateDetails(e.target)} type="date"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Severity(1 to 5)
                            <span className="required">*</span>
                        </label>
                        <input value={details.severity} name="severity" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Type
                            <span className="required">*</span>
                        </label>
                        <input value={details.type} name="type" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Assigned To
                            {/* <span className="required">*</span> */}
                        </label>
                        <input value={details.assignedTo} name="assignedTo" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Status
                        </label>
                        <input value={details.status} name="status" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Resolved on
                        </label>
                        <input value={details.resolvedOn} name="resolvedOn" onChange={(e) => updateDetails(e.target)} type="date"/>
                    </div>
                    <div className="ticket-details">
                        <label>
                            Description
                        </label>
                        <textarea type="text" name="description" value={details.description} onChange={(e) => updateDetails(e.target)}></textarea>
                    </div>
                </div>
                <div className="submit-button">
                    <button onClick={(e) => submitDetails(e)}>Create Ticket</button>
                </div>
            </div>
            <ToastContainer />
        </div>    
    )
}
export default SupportTicket;