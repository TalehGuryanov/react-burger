import style from "./profile.module.css"
import ProfileNav from "../../components/profile-nav/profile-nav";
import UserData from "../../components/user-data/user-data";

function Profile () {
  return (
    <div className={style.wr}>
      <ProfileNav/>
      <UserData/>
    </div>
  )
};

export default Profile;