import style from "./profile.module.css"
import ProfileNav from "../../components/profile-nav/profile-nav";
import UserData from "../../components/user-data/user-data";
import {useRouteMatch} from "react-router-dom";
import React from "react";
import UserOrders from "../../components/user-orders/user-orders";

const Profile: React.FC = () => {
  const {isExact} = useRouteMatch();

  return (
    <div className={style.wr}>
      <ProfileNav/>
      {isExact ? <UserData /> : <UserOrders /> }
    </div>
  )
};

export default Profile;
