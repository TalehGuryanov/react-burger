import style from "./profile.module.css"
import ProfileNav from "../../components/profile-nav/profile-nav";
import UserData from "../../components/user-data/user-data";
import {useRouteMatch} from "react-router-dom";
import React from "react";

const Profile: React.FC = () => {
  const {isExact} = useRouteMatch();

  return (
    <div className={style.wr}>
      <ProfileNav/>
      {isExact ? <UserData/> : "Don't ready" }
    </div>
  )
};

export default Profile;
