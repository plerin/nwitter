import React, {useState} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Route>
            <Switch>
                {isLoggedIn ? 
                //fragment = 부모없이 많은 요소를 render하고 싶을 때 사용 
                <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </> : <Route><Auth /></Route>}
            </Switch>
        </Route>
    );
}