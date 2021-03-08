import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    // const getNweets = async () => {
    //     // 반환이 promise이기 때문에 const를 따로 잡아야 하고 await/async가 필요, 
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach(document => {  //dbNweets QUERYSNAPSHOT이라서 forEach를 돌며 document를 받는다 
    //         const nweetObject = {
    //             ...document.data(), //firebase-firestore에 담긴 데이터
    //             id: document.id
                
    //         }

    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // }

    useEffect(() => {
        //getNweets();
        
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
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
