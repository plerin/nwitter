import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        // onSnapshot : 기본적으로 데이터베이스에 무슨일이 있을 때 알림을 받아!
        dbService.collection("nweets").onSnapshot(snapshot => {
            // ...doc.data()는 배열의 모든 요소를 받아오는 것이야 
            const nweetArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // collection에 doc 추가하는 코드 
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid
        });
        setNweet("");
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    }
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} value={nweet}/>
            <input type="submit" />
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
    </div>
    );
}
export default Home;
