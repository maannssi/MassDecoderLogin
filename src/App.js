
import { useState, useEffect } from "react";
import "./App.css";

function App() {
    // Signup state
    const signupInitialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [signupFormValues, setSignupFormValues] = useState(signupInitialValues);
    const [signupFormErrors, setSignupFormErrors] = useState({});
    const [isSignupSubmit, setIsSignupSubmit] = useState(false);

    // Login state
    const loginInitialValues = {
        email: "",
        password: "",
    };
    const [loginFormValues, setLoginFormValues] = useState(loginInitialValues);
    const [loginFormErrors, setLoginFormErrors] = useState({});
    const [isLoginSubmit, setIsLoginSubmit] = useState(false);

    // Form toggle state
    const [isLoginForm, setIsLoginForm] = useState(true);

    // Signup
    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupFormValues({ ...signupFormValues, [name]: value });
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setSignupFormErrors(validateSignup(signupFormValues));
        setIsSignupSubmit(true);
    };

    useEffect(() => {
        console.log(signupFormErrors);
        if (Object.keys(signupFormErrors).length === 0 && isSignupSubmit) {
            console.log(signupFormValues);
        }
    }, [signupFormErrors, signupFormValues, isSignupSubmit]);

    // Login
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormValues({ ...loginFormValues, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginFormErrors(validateLogin(loginFormValues));
        setIsLoginSubmit(true);
    };

    useEffect(() => {
        console.log(loginFormErrors);
        if (Object.keys(loginFormErrors).length === 0 && isLoginSubmit) {
            console.log(loginFormValues);
        }
    }, [loginFormErrors, loginFormValues, isLoginSubmit]);

    // Validation
    const validateSignup = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn't match. Try again.";
        }
        return errors;
    };

    const validateLogin = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    // Form toggle
    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {isLoginForm ? (
                    // Login form
                    <>
                        {Object.keys(loginFormErrors).length === 0 && isLoginSubmit ? (
                            <div className="ui message success">
                                Logged in successfully
                            </div>
                        ) : (
                            console.log("Login Details", loginFormValues)
                        )}

                        <form onSubmit={handleLoginSubmit}>
                            <h1>Login</h1>
                            <div className="ui divider"></div>
                            <div className="ui form">
                                <div className="field">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={loginFormValues.email}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <p>{loginFormErrors.email}</p>
                                <div className="field">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={loginFormValues.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <p>{loginFormErrors.password}</p>
                                <button className="fluid ui button blue">Submit</button>
                            </div>
                        </form>
                        <div className="text">
                            Don't have an account? <span onClick={toggleForm}>Sign Up</span>
                        </div>
                    </>
                ) : (
                    // Signup form
                    <>
                        {Object.keys(signupFormErrors).length === 0 && isSignupSubmit ? (
                            <div className="ui message success">
                                Signed up successfully
                            </div>
                        ) : (
                            console.log("Signup Details", signupFormValues)
                        )}

                        <form onSubmit={handleSignupSubmit}>
                            <h1>Sign Up</h1>
                            <div className="ui divider"></div>
                            <div className="ui form">
                                <div className="field">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={signupFormValues.username}
                                        onChange={handleSignupChange}
                                    />
                                </div>
                                <p>{signupFormErrors.username}</p>
                                <div className="field">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={signupFormValues.email}
                                        onChange={handleSignupChange}
                                    />
                                </div>
                                <p>{signupFormErrors.email}</p>
                                <div className="field">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={signupFormValues.password}
                                        onChange={handleSignupChange}
                                    />
                                </div>
                                <p>{signupFormErrors.password}</p>
                                <div className="field">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={signupFormValues.confirmPassword}
                                        onChange={handleSignupChange}
                                    />
                                </div>
                                <p>{signupFormErrors.confirmPassword}</p>
                                <button className="fluid ui button blue">Submit</button>
                            </div>
                        </form>
                        <div className="text">
                            Already have an account? <span onClick={toggleForm}>Login</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
