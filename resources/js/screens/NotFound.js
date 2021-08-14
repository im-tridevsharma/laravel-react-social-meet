import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="App__404">
            <div
                className="row justify-content-center align-items-center"
                style={{ height: "85vh" }}
            >
                <div className="col-md-6 text-center">
                    <h1>404</h1>
                    <h2>NotFound</h2>
                    <p>The Page you are looking for is not availabel!</p>
                    <Link to="/" className="btn btn-success">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
