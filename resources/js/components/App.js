import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "../components/Loading";
import AuthState from "../context/AuthState";

const Home = lazy(() => import("../screens/Home/Home"));
const Login = lazy(() => import("../screens/Login/Login"));
const Register = lazy(() => import("../screens/Register/Register"));
const NotFound = lazy(() => import("../screens/NotFound"));
const Header = lazy(() => import("../components/Header"));

function App() {
    return (
        <div className="App">
            <Router>
                <AuthState>
                    <Suspense fallback={<Loading />}>
                        <Header />
                        <div className="App__screens p-3">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route exact path="/" component={Home} />

                                {/* 404 page */}
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Suspense>
                </AuthState>
            </Router>
        </div>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(
        <Router>
            <App />
        </Router>,
        document.getElementById("app")
    );
}
