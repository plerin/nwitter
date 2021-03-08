import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const [apple, setApple] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(apple)
        setApple("");
        
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setApple(value);
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" name="app" value={apple} />
            <input type="submit" value="submit" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}