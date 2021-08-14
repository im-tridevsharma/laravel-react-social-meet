import React from "react";

export default function Loading() {
    return (
        <div
            style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                zIndex: 99,
                width: "50px",
                height: "50px",
                background: "#fff",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
}
