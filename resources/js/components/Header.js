import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Header() {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const active = pathname.split("/");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(function () {
        const token = sessionStorage.getItem("__token");
        token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("__token");
        if (token) {
            axios
                .post(
                    "api/logout",
                    { token },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        sessionStorage.removeItem("__token");
                        setIsLoggedIn(false);
                        history.push("/login");
                    } else if (res.data.error) {
                        console.error(res.data.error);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="App__header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between px-5">
                <Link className="navbar-brand App__header_left" to="/">
                    <img
                        src="logo.png"
                        alt="logo"
                        width="30"
                        className="mr-2"
                    />
                    <span style={{ fontWeight: "bold" }}>Social-meet</span>
                </Link>
                <div className="App__header_right">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li
                                className={
                                    active[1] === ""
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            {!isLoggedIn && (
                                <>
                                    <li
                                        className={
                                            active[1] === "register"
                                                ? "nav-item active"
                                                : "nav-item"
                                        }
                                    >
                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li
                                        className={
                                            active[1] === "login"
                                                ? "nav-item active"
                                                : "nav-item"
                                        }
                                    >
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}

                            {isLoggedIn && (
                                <li className="nav-item">
                                    <button
                                        className="btn btn-danger btn-sm mt-1"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
