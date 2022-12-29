import React, { useContext } from "react";
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { logoutCall } from "../../apiCalls";

export default function Topbar() {

  const {user,dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick= () =>{
    logoutCall(dispatch);
  }
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Homosocial</span>
        </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon"/>
            <input placeholder="Search for a friend or post" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon/>
              <span className="topbarIconBadge"> 1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon/>
              <span className="topbarIconBadge"> 6</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon/>
              <span className="topbarIconBadge"> 1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png" } alt="" className="topbarImg" />
          </Link>
          <button className="topbarButton" onClick={handleClick} >Sign Out</button>
        </div>
    </div>
  )
}
