import React, {useState, useEffect} from "react";
import Sidebar from "../layouts/sidebar";
import '../style/task.scss';
import moment from "moment";

function SupportTask() {
    const apiUrlVite = import.meta.env.VITE_API_URL;

    const [details, setDetails] = useState(null);

    const fetchTask = async () => {
        const apiUrl = `${apiUrlVite}/support-tickets`;
        try {
            const response = await fetch(apiUrl, {
              method: 'GET',
            });
            const data = await response.json();
            setDetails(data.data.tasks);
        } catch (error) {
            console.error('Error adding Agent:', error.message);
        }
    }

    useEffect(() => {
        fetchTask();
    },[])

    return (
        <div className="website">
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className="task-list">
                <div className="create-task-agent">
                    <h3>My Task</h3>
                    <div className="button-container">
                        <div className="create-button">
                            <a href="/agent">
                                <button>Create Agent</button>
                            </a>
                        </div>
                        <div className="create-button">
                            <a href="/ticket">
                                <button>Create Ticket</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="task-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Status</th>
                                <th>Assigned</th>
                                <th>Severity</th>
                                <th>Type</th>
                                <th>Resolved On</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!details && <p className="ticket-create">No Tickets created!</p>}
                            {details && details.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.topic ? data.topic : '-'}</td>
                                        <td>{data.status ? data.status : '-'}</td>
                                        <td>{data.assignedTo ? data.assignedTo : '-'}</td>
                                        <td>{data.severity ? data.severity : '-'}</td>
                                        <td>{data.type ? data.type : '-'}</td>
                                        <td>{data.resolvedOn ? moment(data.resolvedOn).format('MMMM DD, YYYY') : '-'}</td>
                                        <td>{data.dateCreated ? moment(data.dateCreated).format('MMMM DD, YYYY') : '-'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default SupportTask;