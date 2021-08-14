import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div
            className="row justify-content-center align-items-center"
            style={{ height: "80vh" }}
        >
            <div className="col-md-6 text-center">
                <main role="main" className="inner cover">
                    <img src="logo.png" alt="logo" />
                    <h1 className="cover-heading mt-2">
                        Connect with your loved ones.
                    </h1>
                    <p className="lead">
                        Social-meet makes anyone to meet someone virtually but
                        it is supposed to be physical, emotional. And thank you
                        for being the part of Social-meet.
                    </p>
                    <p className="lead">
                        <Link to="/register" className="btn btn-lg btn-success">
                            Register
                        </Link>
                    </p>
                </main>

                <footer className="mastfoot mt-auto">
                    <div className="inner">
                        <p>
                            Cover template for <a href="/">Social-meet</a>, by{" "}
                            <a
                                target="_blank"
                                href="https://github.com/im-tridevsharma"
                            >
                                @tridevsharma
                            </a>
                            .
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
