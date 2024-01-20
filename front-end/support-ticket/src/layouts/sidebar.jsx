import React, {useState, useEffect} from "react";
import '../style/sidemenu.scss';

function Sidebar() {

    return (
        <div className="sidebar-container">
            <h2>Tickets</h2>
            <div className="sub-page-container">
                {/* <a href="/">
                    Task 
                </a> */}
                <a href="/agent">
                    Agents
                </a>
                <a href="/ticket">
                    Tickets
                </a>
            </div>
        </div>
    )
}
export default Sidebar;