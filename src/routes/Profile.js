import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    
    const onChange = (event) => {
        const { target : {value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();

        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            // navigation에 있는 displayname update  // app.js에서 갖고옴 
            refreshUser();
        }
    }
    const getMyNweets = async () => {
        // db에서 필터링 사용하는 방법 where 
        // 그래서 아래를 통해 collection안에 있는 데이터를 쿼리(query)를 이용해 마음대로 갖다 사용할 수 있다.
        const nweets = await dbService.collection("nweets").where("creatorId","==",userObj.uid).get();
        //console.log(nweets.docs.map((doc) => doc.data()));
    }

    useEffect(() => {
        getMyNweets();
    }, [])
    // const [apple, setApple] = useState("");
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(apple)
    //     setApple("");
        
    // }
    // const onChange = (event) => {
    //     const {target:{value}} = event;
    //     setApple(value);
    // }
    return (
        <>
        {/* <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" name="app" value={apple} />
            <input type="submit" value="submit" />
        </form> */}
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}