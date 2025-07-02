import React from "react";

const Admin = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Admin Dashboard</h1>
            <div style={{
                marginTop: "2rem",
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap"
            }}>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    minWidth: "220px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Users</h2>
                    <p>Manage user accounts, roles, and permissions.</p>
                    <button>Go to Users</button>
                </div>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    minWidth: "220px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Data</h2>
                    <p>View and manage datasets and uploads.</p>
                    <button>Go to Data</button>
                </div>
                <div style={{
                    background: "#f5f5f5",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    minWidth: "220px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h2>Settings</h2>
                    <p>Configure system settings and preferences.</p>
                    <button>Go to Settings</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;