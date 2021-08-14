import React from "react";

export default function FormInput(props) {
    const { name, type, label, reverse } = props;
    return (
        <div className="form-group mb-1">
            {reverse !== "yes" && (
                <label htmlFor={name} style={{ marginBottom: "2px" }}>
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                className={reverse !== "yes" ? "form-control" : "mr-2"}
                {...props}
            />
            {reverse === "yes" && <label htmlFor={name}>{label}</label>}
        </div>
    );
}
