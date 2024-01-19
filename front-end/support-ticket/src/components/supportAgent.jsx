import React, {useState, useEffect} from "react";
import Sidebar from "../layouts/sidebar";
import '../style/agents.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupportAgent() {

    const uri = process.env.NODE_ENV === 'production' ? 'https://ticket-backend-six.vercel.app' : 'http://localhost:8000/api';
    const [details, setDetails] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        active: true
    })
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };
    
    const updateDetails = (element) => {
        const {name, value} = element;
        setDetails({
            ...details,
            [name]: value
        })
    }

    const submitDetails = async (e) => {
        const validationChecks = [
            { field: 'Name', value: details.name, message: 'is required' },
            { field: 'Email', value: details.email, message: 'is required' },
            { field: 'Phone', value: details.phone, message: 'is required' },
            { field: 'Description', value: details.description, message: 'is required' },
            { field: 'Email', value: details.email, message: 'is invalid', validator: validateEmail },
            { field: 'Phone', value: details.phone, message: 'is invalid', validator: validatePhone },
            { field: 'Description', value: details.description, message: 'should be 500 words or less'},
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
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(details);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${uri}/support-agents`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                toast.success('User Agent Created')
            })
            .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {

    },[])

    return (
        <div className="website">
            <div>
                <Sidebar />
            </div>
            <div>
                <h3>Support Agent Creation</h3>
                <div className="agent-creation">
                    <div className="agents-details">
                        <label>
                            Name 
                            <span className="required">*</span>
                        </label>
                        <input value={details.name} name="name" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="agents-details">
                        <label>
                            Email
                            <span className="required">*</span>
                        </label>
                        <input value={details.email} name="email" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="agents-details">
                        <label>
                            Phone
                            <span className="required">*</span>
                        </label>
                        <input value={details.phone} name="phone" onChange={(e) => updateDetails(e.target)} type="text"/>
                    </div>
                    <div className="agents-details">
                        <label>
                            Description
                        </label>
                        <textarea type="text" name="description" value={details.description} onChange={(e) => updateDetails(e.target)}></textarea>
                    </div>
                </div>
                <div className="submit-button">
                    <button onClick={(e) => submitDetails(e)}>Create Agent</button>
                </div>
            </div>
            <ToastContainer />
        </div>  
    )
}
export default SupportAgent;