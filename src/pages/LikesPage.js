import React from "react";
import LikesList from "../components/LikesList.jsx";

function LikesPage(){
    return(
        <div className="mt-5 pt-5">
        <LikesList userId={1} />
        </div>
    )
}

export default LikesPage;