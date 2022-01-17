import React, { useContext,useRef, useEffect, useState } from 'react'
import axios from "axios"
import { AuthContext } from '../authContext/AuthContext';

export default function Post({userID, isUpdated, setIsUpdated}) {
    const value = useContext(AuthContext)
    const post = useRef()
    const [buttonID,setButtonID] = useState([])
    const [users,setUsers] = useState()

    const handleClick = async (e) => {
        e.preventDefault();
        const date = new Date()
        const createPost = {
            userID: value.state.user._id,
            userName:value.state.user.userName,
            post:post.current.value,
            date: date.toLocaleDateString()
        }
        try{
            await axios.post("/posts",createPost)
            setIsUpdated(!isUpdated)
            post.current.value = ''
        } catch(err){
            console.log(err)
        }
    }

    const handleAddClick = async (id) => {
        if(buttonID.includes(id)) {
            try{
                await axios.put("/deleteFriends/" + id,{userID: value.state.user._id})
            } catch(err) {
                console.log(err)
            }
            const newID = buttonID.filter((button) => {
                return button !== id
            })
            setButtonID(newID)
        } else {
            try{
                await axios.put("/addFriends/" + id,{userID: value.state.user._id})
            } catch (err) {
                console.log(err)
            }
            const newID = [...buttonID,id]
            setButtonID(newID)
        }
        setIsUpdated(!isUpdated)
    }

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const allUsers = await axios.get("/allUsers/" + userID)
                const getUser = await axios.get("/users/" + value.state.user._id)
                setUsers(allUsers.data)
                setButtonID(getUser.data.friends)
            } catch(err) {
                console.log(err)
            }
        }
        getAllUsers()
    },[])


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postLeft">
                    <span className="otherUsers">Other Users</span>
                        {users?.map((user) => (
                            <ul className="usersLists">
                                <li className="users">
                                    <span className="userName">{user.userName}</span>
                                    <button className={buttonID.includes(user._id) ? "addButton active" : "addButton"} onClick={() => handleAddClick(user._id)}>
                                    {buttonID.includes(user._id) ? "Remove" : "Add"}</button>
                                </li>
                            </ul>
                        ))}
                </div>
                <div className="postRight">
                    <form className="postSubmit" onSubmit={handleClick}>
                        <input placeholder='Share comments with your friends' maxLength='100' className="sharePost" ref={post} />
                        <button className="shareButton">Share</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
