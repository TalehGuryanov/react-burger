import {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/get-cookie";
import {editUserDataThunk, getUserDataThunk, updateTokenThunk} from "../../services/actions/user-data";
import Preloader from "../preloader/preloader";
import Notification from "../notification/notification";

function UserData() {
  const { updateTokenRequest, updateTokenSuccess, updateTokenError, user, userDataRequest, userDataError, editUserDataRequest, editUserDataSuccess, editUserDataError } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [newName, setUserNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const oldAccessToken = getCookie('accessToken');

    if(!oldAccessToken) {
      dispatch(updateTokenThunk());
    }

    const newAccessToken = updateTokenSuccess ? getCookie('accessToken') : null;
    const currentAccessToken = newAccessToken || oldAccessToken;

    if(!user && currentAccessToken) {
      dispatch(getUserDataThunk(currentAccessToken));
    }
  }, [user, updateTokenSuccess]);

  const onEditUserData = (event) => {
    event.preventDefault();

    const accessToken = getCookie('accessToken');
    const name = newName || user.name;
    const email = newEmail || user.email;
    const password = newPassword || user.password;

    dispatch(editUserDataThunk(accessToken, email, password, name));
  }

  const onSetUserName = ({target}) => {
    setUserNewName(target.value);
  }

  const onSetEmail = ({target}) => {
    setNewEmail(target.value);
  }

  const onSetPassword = ({target}) => {
    setNewPassword(target.value);
  }

  const renderNotification = () => {
    if(userDataError || updateTokenError || editUserDataError) {
      return <Notification status={false} text="Что-то пошло не так. Попробуйте еще раз"/>
    } else if (editUserDataSuccess) {
      return <Notification status={true} text="Данные успешно обновлены"/>
    }
  }

  return(
    updateTokenRequest || userDataRequest || editUserDataRequest ? <Preloader /> :
      <div>
        <form onSubmit={onEditUserData}>
          <div className="pb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onSetUserName}
              icon={"EditIcon"}
              value={newName || user?.name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <Input
              type={"email"}
              placeholder={"Email"}
              onChange={onSetEmail}
              icon={"EditIcon"}
              value={newEmail || user?.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={onSetPassword}
              icon={"EditIcon"}
              value={newPassword}
              name={"password"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>

        {renderNotification()}
      </div>
  )
};

export default UserData;