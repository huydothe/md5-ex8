import {useEffect, useState} from "react";
import {Box, Button, TextField} from "@mui/material";

function InputForm(){

    const MESSAGE_ERROR = {
        username : "Username error",
        email : "Email error",
        password : "Password error",
        confirmPassword : "Password must be the same"
    };

    const REGEX = {
        username : /^[a-zA-Z0-9]+\S{2,} $/,
        email : /^[a-zA-Z0-9]+\S{2,}@gmail.com $/,
        password : /^[A-Z]+\S{5,}$/
    };

    const [input, setInput] = useState({});

    const handleChange = (e) => {
        let error = "";
        if(e.target.name === 'password'){
            if(input.confirmPassword && input.confirmPassword.value){
                error = e.target.value === input.confirmPassword.value
                ? "" : MESSAGE_ERROR[e.target.name]
            }else {
                error = REGEX[e.target.name].test(e.target.value)
                ? "" : MESSAGE_ERROR[e.target.name]
            }
        }else if(e.target.name === 'confirmPassword'){
            error = e.target.value === input.password.value
            ? "" : MESSAGE_ERROR[e.target.name]
        }else {
            error = REGEX[e.target.name].test(e.target.value)
            ? "" : MESSAGE_ERROR[e.target.name]
        }
        setInput({
            ...input,
            [e.target.name] : {
                value : e.target.value,
                error : error
            }
        })
    }


    const handleSubmit = () => {
        const isFilled =
            input.username && input.email && input.password && input.confirmPassword
        && input.username.value && input.email.value && input.password.value && input.confirmPassword.value;
        const isError = isFilled && (input.username.error || input.email.error || input.password.error || input.confirmPassword.error)
        if(!isFilled){
            alert("Please fill out all the fields!!!")
        }else if(isFilled && isError){
            alert("Wrong somewhere")
        }else {
            alert("Sign in success!!!")
        }
    }


    return(
        <form onSubmit={() => handleSubmit()}>
            <h1 style={{color : "blueviolet"}}>Sign Up</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
            >
                <div className={`custom-input ${input.username &&
                input.username.error &&
                "custom-input-error"}`}>
                    <TextField
                        required
                        onChange={(e) => handleChange(e)}
                        value={input.username && input.username.value || ""}
                        name = "username"
                        id="outlined-required"
                        label="Username"
                        defaultValue=""
                    />
                    {input.username && input.username.error && (
                        <p className="error" style={{color : "red"}}>{input.username.error}</p>
                    )}
                </div>
                <div className={`custom-input ${input.email &&
                input.email.error &&
                "custom-input-error"}`}>
                    <TextField
                        required
                        onChange={(e) => handleChange(e)}
                        value={input.email && input.email.value || " "}
                        name = "email"
                        id="outlined-required"
                        label="Email"
                        defaultValue=""
                    />
                    {input.email && input.email.error && (
                        <p className="error" style={{color : "red"}}>{input.email.error}</p>
                    )}
                </div>
                <div className={`custom-input ${input.password &&
                input.password.error &&
                "custom-input-error"}`}>
                    <TextField
                        required
                        onChange={(e) => handleChange(e)}
                        type="password"
                        value={input.password && input.password.value || " "}
                        name = "password"
                        id="outlined-required"
                        label="Password"
                        defaultValue=""
                    />
                    {input.password && input.password.error && (
                        <p className="error" style={{color : "red"}}>{input.password.error}</p>
                    )}
                </div>
                <div className={`custom-input ${input.confirmPassword &&
                input.confirmPassword.error &&
                "custom-input-error"}`}>
                    <TextField
                        required
                        onChange={(e) => handleChange(e)}
                        type="password"
                        value={input.confirmPassword && input.confirmPassword.value || " "}
                        name = "confirmPassword"
                        id="outlined-required"
                        label="Confirm password"
                        defaultValue=""
                    />
                    {input.confirmPassword && input.confirmPassword.error && (
                        <p className="error" style={{color : "red"}}>{input.confirmPassword.error}</p>
                    )}
                </div>
                <Button type="button" onClick={handleSubmit} variant="outlined" color="primary" style={{margin : "8px"}}>
                    Submit
                </Button>
            </Box>
        </form>
    )
}
export default InputForm