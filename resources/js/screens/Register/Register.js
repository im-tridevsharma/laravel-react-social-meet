import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import FormInput from "../../components/FormInput";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/authContext";
import styles from "./Register.module.css";

export default function Register() {
    const history = useHistory();

    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [allValues, setAllValues] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        cnf_password: "",
    });
    const [allErrors, setAllErrors] = useState({});
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(function () {
        isLoggedIn ? history.push("/") : "";
    }, []);

    function handleOnChange(e) {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }

    function handleRegisterForm(e) {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post("api/users", allValues)
            .then((res) => {
                setIsLoading(false);
                if (res.data.errors) {
                    setAllErrors(res.data.errors);
                } else {
                    setAllErrors({});
                    if (res.data.message) {
                        setSuccessMessage(res.data.message);
                        setAllValues({
                            fullname: "",
                            username: "",
                            email: "",
                            password: "",
                            cnf_password: "",
                        });
                        document.getElementById("register-form").reset();
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="App__register">
            {isLoading && <Loading />}

            <div className={styles.bg_aanounce}>
                <img src="images/announce.png" alt="announce" width="400" />
            </div>
            <div className={styles.bg_register}>
                <img src="images/register.png" alt="register" width="400" />
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 mt-5">
                    {successMessage && (
                        <p className="alert alert-success">{successMessage}</p>
                    )}
                    <div className="card">
                        <div className="card-header">
                            <h4>Register</h4>
                        </div>
                        <div className="card-body">
                            <form
                                method="POST"
                                id="register-form"
                                onSubmit={handleRegisterForm}
                            >
                                <FormInput
                                    name="fullname"
                                    type="text"
                                    label="Fullname"
                                    reverse="no"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span className="text-danger">
                                    {allErrors.fullname
                                        ? allErrors.fullname
                                        : ""}
                                </span>

                                <FormInput
                                    name="username"
                                    type="text"
                                    label="Username"
                                    reverse="no"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span className="text-danger">
                                    {allErrors.username
                                        ? allErrors.username
                                        : ""}
                                </span>
                                <FormInput
                                    name="email"
                                    type="email"
                                    label="Email"
                                    reverse="no"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span className="text-danger">
                                    {allErrors.email ? allErrors.email : ""}
                                </span>
                                <FormInput
                                    name="password"
                                    type="password"
                                    label="Password"
                                    reverse="no"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span className="text-danger">
                                    {allErrors.password
                                        ? allErrors.password
                                        : ""}
                                </span>
                                <FormInput
                                    name="cnf_password"
                                    type="password"
                                    label="Confirm Password"
                                    reverse="no"
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span className="text-danger">
                                    {allErrors.cnf_password
                                        ? allErrors.cnf_password
                                        : ""}
                                </span>
                                <div className="form-group mt-3">
                                    <button className="btn btn-primary float-right">
                                        Register
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
