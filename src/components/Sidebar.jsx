import React from "react";
import UsersSidebarElement from "./UsersSidebarElement";
import LikesSidebarElement from "./LikesSidebarElement";

function Sidebar(){
    return (
          <div className="position-absolute end-0 h-100 col-4 border-start" >
            <ul className="list-unstyled ps-4">
              <UsersSidebarElement></UsersSidebarElement>
              <LikesSidebarElement userId={1}></LikesSidebarElement>
            </ul>
          </div>
      );
}

export default Sidebar;