import React, { useState } from "react";

// export default () => <span>Auth</span>

// 다른 파일에서 자동 import 할 수 있는 방법
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        console.log(event.target.name);
    };
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" value={email} onChange={onChange} required />
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
            <input type="submit" value="Log In" />
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth;