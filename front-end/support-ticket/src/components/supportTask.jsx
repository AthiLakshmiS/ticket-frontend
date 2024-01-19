import React, {useState, useEffect} from "react";
import Sidebar from "../layouts/sidebar";
import '../style/task.scss';

function SupportTask() {

    const [details, setDetails] = useState({
        name: null,
    })

    useEffect(() => {

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

                </div>
            </div>
        </div>
    )
}
export default SupportTask;