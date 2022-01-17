import React from 'react'
import axios from "axios"

export default function UserPosts({post,isUpdated,setIsUpdated}) {
    
    const handleClick = async () => {
        try{
            await axios.delete("/posts/" + post._id)
            setIsUpdated(!isUpdated)
        } catch(err) {
            console.log(err)
        }
        
    }


    return (
        <div className="userposts">
            <div className="userpostsWrapper">
                <div className="postTop">
                    <span className="post">{post.post}</span>
                </div>
                <div className="postBottom">
                    <span className="date">{post.date}</span>
                    <button className="postDelete" onClick={handleClick}>Delete</button>
                </div>
            </div>
        </div>
    )
}
