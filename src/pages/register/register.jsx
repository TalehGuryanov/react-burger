import React, {useEffect, useState} from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerUserThunk} from "../../services/actions/auth";
import Preloader from "../../components/preloader/preloader";
import Notification from "../../components/notification/notification";


const Register = () => {
  const { isRegisterSuccess, isRegisterRequest, isRegisterFailed } = useSelector(store => store.authResponse);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitRegistration = (event) => {
    event.preventDefault();
    dispatch(registerUserThunk(userName, email, password));
  };

  const redirectToLogin = () => {
    if(isRegisterSuccess) {
      setTimeout(() => history.replace('/login'), 1000);
    }
  }

  useEffect(() => {
    redirectToLogin();
  }, [isRegisterSuccess, redirectToLogin])

  const onSetName = ({target}) => {
    setUserName(target.value);
  }

  const onSetEmail = ({target}) => {
    setEmail(target.value);
  }

  const onSetPassword = ({target}) => {
    setPassword(target.value);
  }

  const renderResult = () => {
    if (isRegisterFailed){
      return <Notification text="Что-то пошло не так. Попробуйте еще раз" status={false}/>
    } else if(isRegisterSuccess) {
      return <Notification text="Спасибо за регистрацию" status={true}/>
    }
  }

  return (
    isRegisterRequest ? <Preloader/> :
      <div className={style.wr}>
        <div className={style.title + " text text_type_main-medium"}>
          Регистрация
        </div>

        <form className={style.form} onSubmit={onSubmitRegistration}>
          <div className={style.form_field__wr}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              name={"user"}
              error={false}
              size={"default"}
              onChange={onSetName}
              value={userName}
            />
          </div>
          <div className={style.form_field__wr}>
            <Input
              type={"text"}
              placeholder={"E-mail"}
              name={"email"}
              error={false}
              size={"default"}
              onChange={onSetEmail}
              value={email}
            />
          </div>
          <div className={style.form_field__wr}>
            <PasswordInput
              name={"password"}
              onChange={onSetPassword}
              value={password}
            />
          </div>
          <div className={style.form_submit__wr}>
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <div className={style.footer}>
          <div className={style.footer_link__wr}>
            <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</span>
            <Link className={style.footer_link + " text text_type_main-default"} to="/login"> Войти</Link>
          </div>
        </div>

        {renderResult()}
      </div>
  );
};

export default Register;
