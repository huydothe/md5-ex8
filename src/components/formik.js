import {useState} from "react";
import {Formik} from "formik";
import {Button, TextField} from "@mui/material";

export default function LoginFormik() {
    const REGEX = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };

    const [form, setForm] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleValidate = () => {
        const error = {};
        if (!form.email) {
            error.email = "Require"
        } else if (!REGEX.email.test(form.email)) {
            error.email = "Invalid email address"
        }
        if (!form.password) {
            error.password = "Require"
        }
        return error;
    }

    const handleSubmit = () => {
        alert('Login success')
    };


    return (
        <div>
            <h1 style={{color: "blueviolet"}}>Sign in</h1>
            <Formik
                initialValues={form}
                validate={handleValidate}
                onSubmit={handleSubmit}
            >
                {({error, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`custom-input ${
                                error.email ? "custom-input-error" : ""
                            }`}
                        >
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email || ''}
                                onChange={handleChange}
                            />
                            <p className="error">{error.email}</p>
                        </div>
                        <div
                            className={`custom-input ${
                                error.password ? "custom-input-error" : ""
                            }`}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password || ''}
                                onChange={handleChange}
                            />
                            <p className="error">{error.password}</p>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}