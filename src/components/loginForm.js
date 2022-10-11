import {useEffect, useState} from "react";
import {Box, Button, TextField} from "@mui/material";

export default function LoginForm() {

    const MESSAGE_ERROR = {
        username: "Email error",
        password: "Password error",
    };

    const REGEX = {
        username: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/
    };

    const [form, setForm] = useState({});

    const handleChange = (e) => {
        // console.log(e.target.name)
        let error = '';
        if (e.target.name === 'username') {
            if (form.username && form.username.value) {
                error = REGEX[e.target.name].test(e.target.value)
                    ? "" : MESSAGE_ERROR[e.target.name]
            }
        } else {
            if (form.password && form.password.value) {
                error = REGEX[e.target.name].test(e.target.value)
                    ? "" : MESSAGE_ERROR[e.target.name]
            }
        }
        setForm({
            ...form,
            [e.target.name]: {
                value: e.target.value,
                error: error
            }
        })
    }

    const handleSubmit = () => {
        const isFilled = form.username && form.username.value && form.password && form.password.value;
        const isError = isFilled && (form.username.error || form.password.error);
        if (!isFilled) {
            alert('Please fill out all the fields!!!')
        } else if (isFilled && isError) {
            alert("Wrong somewhere")
        } else {
            alert("Login success !!!")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
            <h1 style={{color: "blueviolet"}}>Sign in</h1>
                    <div className={`custom-input ${form.username &&
                    form.username.error &&
                    "custom-input-error"}`}>
                        <TextField
                            required
                            onChange={(e) => handleChange(e)}
                            value={form.username && form.username.value || ""}
                            name="username"
                            id="outlined-required"
                            label="username"
                            defaultValue=""
                        />
                        {form.username && form.username.error && (
                            <p className="error" style={{color: "red"}}>{form.username.error}</p>
                        )}
                    </div>
                    <div className={`custom-input ${form.password &&
                    form.password.error &&
                    "custom-input-error"}`}>
                        <TextField
                            required
                            onChange={(e) => handleChange(e)}
                            value={form.password && form.password.value || ""}
                            name="password"
                            id="outlined-required"
                            label="password"
                            defaultValue=""
                        />
                        {form.password && form.password.error && (
                            <p className="error" style={{color: "red"}}>{form.password.error}</p>
                        )}
                    </div>
                    <Button type="submit" variant="outlined" color="primary"
                            style={{margin: "8px"}}>
                        Submit
                    </Button>
            </form>
        </>
    )
}