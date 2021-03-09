import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // userObj는 우리 사이트 어디에서나 다 필요해 그럼 최상위 코드(App)에 있어야 해 그래야 다 갖다 사용할 수 있어
  const [userObj, setUserObj] = useState(null);
  //useEffect == componentDidMount + DidUpdate 합쳐진 것 component 이벤트 발생시 실행 , 파라미터로 []는 dependency ,, 적혀있는 값이 변경되야 반응, []처럼 비어있으면 언제든 발생 
  useEffect(() => {
    // onAuthStateChanged = auth에 변화가 생길 때 ex) 로그인 / 로그아웃
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
