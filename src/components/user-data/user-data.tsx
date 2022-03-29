import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../services/hooks";
import {getCookie} from "../../utils/cookie";
import {editUserDataThunk, getUserDataThunk} from "../../services/actions/user-data";
import {updateTokenThunk} from "../../services/actions/auth";
import {Preloader} from "../preloader/preloader";
import {Notification} from "../notification/notification";
import style from "./user-data.module.css"
import {RootState} from "../../services/types";

const UserData: React.FC = () => {
  const { user, userDataRequest, userDataError, editUserDataRequest, editUserDataSuccess, editUserDataError } = useSelector((store: RootState) => store.user);
  const { updateTokenRequest, updateTokenSuccess, updateTokenError } = useSelector((store: RootState) => store.authResponse);
  const [newName, setUserNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isDataChanged, setDataChanged] = useState<boolean>(false);
  const dispatch = useDispatch();
  const refreshToken: string = getCookie('refreshToken');
  const formRef = useRef<any>(null);

  const onChangeForm: () => void = () => {
    const elements = formRef.current?.elements;
    const currentValue = elements?.name.value + elements?.email.value + elements?.password.value;
    const defaultData = user.name + user.email;

    if(defaultData === currentValue) {
      setDataChanged(false);
    } else {
      setDataChanged(true);
    }
  }

  useEffect(() => {
    const oldAccessToken: string = getCookie('accessToken');

    if(!oldAccessToken) {
      dispatch(updateTokenThunk(refreshToken));
    }

    const newAccessToken = updateTokenSuccess ? getCookie('accessToken') : null;
    const currentAccessToken: string = newAccessToken || oldAccessToken;

    if(!user && currentAccessToken) {
      dispatch(getUserDataThunk(currentAccessToken));
    }
  }, []);

  const onEditUserData: (event: FormEvent) => void = (event) => {
    event.preventDefault();

    const accessToken: string = getCookie('accessToken');
    const name: string = newName || user.name;
    const email: string = newEmail || user.email;
    const password: string = newPassword || user.password;

    dispatch(editUserDataThunk(accessToken, email, password, name));

    if(editUserDataSuccess) {
      setDataChanged(false);
    }
  }

  const onSetUserName: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    setUserNewName(event.target.value);
  }

  const onSetEmail: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    setNewEmail(event.target.value);
  }

  const onSetPassword: (event: ChangeEvent<HTMLInputElement>) => void = (event) => {
    setNewPassword(event.target.value);
  }

  const onReset = (event: FormEvent) => {
    event.preventDefault();

    setUserNewName(user.name);
    setNewEmail(user.email);
    setNewPassword("");
    setDataChanged(false);
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
        <form onSubmit={onEditUserData} onChange={onChangeForm} ref={formRef}>
          <div className="pb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onSetUserName}
              icon={"EditIcon"}
              value={newName || user?.name || ""}
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
              value={newEmail || user?.email || ""}
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
              value={newPassword || ""}
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
