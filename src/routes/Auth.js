import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

// export default () => <span>Auth</span>

// 다른 파일에서 자동 import 할 수 있는 방법
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setnewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    // 기본행위방지코드, 이렇게 이벤트 실행을 중지시키지 않으면 페이지는 새로고침되고 react 코드(state ..)가 사라져 이를 방지하기 위한 코드
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        //create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setnewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {target: {name}} = event;
    let provider;
    if(name === "google"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === "github"){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Acoount" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
