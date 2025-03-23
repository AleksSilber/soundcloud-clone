import React from "react";
import FollowingPosts from "../components/FollowingPost.jsx";
import Sidebar from "../components/Sidebar.jsx";


function FeedPage() {
    return (
        <div className="d-flex mt-5 pt-5">
            <Sidebar />
            <div className='d-block'>
                <FollowingPosts />
            </div>
        </div>
    )
}

export default FeedPage;