import {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/cookie";
import {editUserDataThunk, getUserDataThunk, updateTokenThunk} from "../../services/actions/user-data";
import Preloader from "../preloader/preloader";
import Notification from "../notification/notification";
import style from "./user-data.module.css"

function UserData() {
  const { updateTokenRequest, updateTokenSuccess, updateTokenError, user, userDataRequest, userDataError, editUserDataRequest, editUserDataSuccess, editUserDataError } = useSelector(store => store.user);
  const [newName, setUserNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("******");
  const [isDataChanged, setDataChanged] = useState(false);
  const dispatch = useDispatch();

  const compareData = () => {
    const defaultData = user.name + user.email;
    const newData = newName + newEmail + newPassword;

    if(defaultData === newData) {
      setDataChanged(false);
    } else {
      setDataChanged(true);
    }
  }

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

    if(user) {
      compareData();
    }
  }, []);

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

  const onReset = (event) => {
    event.preventDefault();

    setUserNewName(user.name);
    setNewEmail(user.email);
    setNewPassword("");
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

          {isDataChanged &&
            <div className={style.form_buttons}>
              <Button type="primary" size="medium">
                Сохранить
              </Button>

              <Button type="primary" size="medium" onClick={onReset}>
                Отмена
              </Button>
            </div>
          }
        </form>

        {renderNotification()}
      </div>
  )
};

export default UserData;