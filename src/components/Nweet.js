import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //editing은 true/false를 갖고있으니 setEditing으로 이전 값의 반대로 toggle 
    const toggleEditing = (event) => setEditing((prev) => !prev);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you really want to delete nweet?");
        if(ok){
            // doc 안에 경로가 들어가야해 ,, collection/document(id)
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }
    
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewNweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        });
        setEditing(false);
    }

    
    return (

        <div>
            {editing ? <>
                {isOwner && (
                    <>
                        <form onSubmit={onSubmit}>  
                            <input type="text" onChange={onChange} placeholder="Edit your nweet" value={newNweet} required />
                            <input type="submit" value="Update nweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                )}
            </> : <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditing} value={nweetObj.text}>Edit Nweet</button>
                </>
            )}
            </>}
            
        </div>
    );
}

export default Nweet;