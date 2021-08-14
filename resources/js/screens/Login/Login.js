import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";

export default function Login() {
    const history = useHistory();

    useEffect(function () {
        const token = sessionStorage.getItem("__token");
        token ? history.push("/") : "";
    }, []);

    const [allValues, setAllValues] = useState({
        email: "",
        password: "",
        remember: null,
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }

    function hangleLoginForm(e) {
        e.preventDefault();
        if (allValues.email === "" || allValues.email === null) {
            setErrors({ ...errors, email: ["Email is required!"] });
            return false;
        }
        axios
            .post("api/login", allValues)
            .then((res) => {
                if (res.data.error) {
                    setErrors(res.data.error);
                } else {
                    setErrors({});
                }

                if (!res.data.success && res.data.message) {
                    setErrorMessage(res.data.message);
                } else {
                    setErrorMessage("");
                }

                if (res.data.success && res.data.token) {
                    setAllValues({
                        email: "",
                        password: "",
                        remember: null,
                    });
                    document.getElementById("login-form").reset();
                    sessionStorage.setItem("__token", res.data.token);
                    history.push("/");
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className="App__login">
            <div className="row justify-content-center">
                <div style={{ position: "fixed", left: "10px", top: "20%" }}>
                    <img
                        src="/images/bullhorn.png"
                        alt="bullhorn"
                        width="400"
                    />
                </div>
                <div style={{ position: "fixed", right: "10px", top: "20%" }}>
                    <img
                        src="/images/megaphone.png"
                        alt="megaphone"
                        width="400"
                    />
                </div>
                <div className="col-md-4 mt-5">
                    {errorMessage && (
                        <p className="alert alert-danger">{errorMessage}</p>
                    )}
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form
                                method="POST"
                                id="login-form"
                                onSubmit={hangleLoginForm}
                            >
                                <FormInput
                                    name="email"
                                    type="email"
                                    label="Email ID"
                                    reverse="no"
                                    onChange={(e) => handleChange(e)}
                                />
                                {errors.email ? (
                                    <span className="text-danger">
                                        {errors.email}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <FormInput
                                    name="password"
                                    type="password"
                                    label="Password"
                                    reverse="no"
                                    onChange={(e) => handleChange(e)}
                                />
                                {errors.password ? (
                                    <span className="text-danger">
                                        {errors.password}
                                    </span>
                                ) : (
                                    ""
                                )}
                                <FormInput
                                    name="remember"
                                    type="checkbox"
                                    label="Remember me"
                                    reverse="yes"
                                    onChange={(e) => handleChange(e)}
                                />

                                <div className="form-group mb-1">
                                    <Link to="/forgot_password">
                                        Forgot Password?
                                    </Link>
                                    <button className="btn btn-primary float-right">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
