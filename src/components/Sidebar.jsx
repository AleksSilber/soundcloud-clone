import React from "react";
import UsersSidebarElement from "./UsersSidebarElement copy";
import LikesSidebarElement from "./LikesSidebarElement";

function Sidebar(){
    return (
          <div className="p-3 position-absolute end-0 h-100 col-4" >
            <ul className="list-unstyled ps-5">
              <UsersSidebarElement></UsersSidebarElement>
              <LikesSidebarElement></LikesSidebarElement>
            </ul>
          </div>
      );
}

export default Sidebar;