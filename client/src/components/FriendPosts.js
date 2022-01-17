import React from 'react'
import {useEffect,useState} from "react"
import axios from "axios"

export default function FriendPosts({post,date,userName}) {

    return (
        <div className="userposts">
            <div className="userpostsWrapper">
                <div className="postTop">
                    <span className="post">{post}</span>
                </div>
                <div className="postBottom">
                    <span className="date">{date}</span>
                    <span className="username">{userName}</span>
                </div>
            </div>
        </div>
    )
}
