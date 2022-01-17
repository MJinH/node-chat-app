import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from "./Post"
import { AuthContext } from '../authContext/AuthContext'
import axios from 'axios'
import UserPosts from './UserPosts'
import FriendPosts from './FriendPosts'

export default function MainPage() {
    const user = useParams().username
    const value = useContext(AuthContext)
    const [friendPosts, setFriendPosts] = useState()
    const [posts,setPosts] = useState()
    const [isUpdated,setIsUpdated] = useState(false)
    useEffect(()=> {
        const getPosts = async () => {
            try{
                const user = await axios.get("/users/" + value.state.user._id)
                const userPost = await axios.get("/posts/" + user.data._id)
                const friendPost = await axios.put("/friendPosts", {friends: user.data.friends})  
                setPosts(userPost.data)
                setFriendPosts(friendPost.data)
            } catch (err){
                console.log(err)
            }
        }
        getPosts()
    },[isUpdated])

    
    return (
        <div className="mainPage">
            <div className="mainPageTop">
                <div className="topLeft">
                    {posts?.map((post) => (
                        <UserPosts
                            key={post._id}
                            post={post}
                            isUpdated={isUpdated}
                            setIsUpdated={setIsUpdated}
                        />
                    ))}
                </div>
                <div className="topRight">
                    {friendPosts?.map((post) => post.map(p => (
                        <FriendPosts
                            key={p._id} 
                            post={p.post}
                            date={p.date}
                            userID={p.userID}
                            userName={p.userName}
                        />
                    )))}
                </div>
            </div>
            <div className="mainPageBottom">
                {(value.state.user.userName === user) && <Post userID={value.state.user._id} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>}
            </div>
        </div>
    )
}
