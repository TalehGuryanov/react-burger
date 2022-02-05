import React, {useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import {
  PasswordInput,
  Button, Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {loginUserThunk} from "../../services/actions/auth";
import Preloader from "../../components/preloader/preloader";
import Notification from "../../components/notification/notification";
import PropTypes from "prop-types";

const Login = ({isLogged, redirectTo}) => {
  const { isLoginSuccess, isLoginRequest, isLoginFailed } = useSelector(store => store.authResponse);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(loginUserThunk(email, password));
  }

  const onSetEmail = ({target}) => {
    setEmail(target.value);
  }

  const onSetPassword = ({target}) => {
    setPassword(target.value);
  }

  const renderError = () => {
    if (isLoginFailed){
      return <Notification text="Что-то пошло не так. Попробуйте еще раз" status={false}/>
    }
  }

  const destination = history.location.state?.from || redirectTo;

  if(isLogged || isLoginSuccess) {
    return (
      <Redirect to={ destination }/>
    );
  }

  return (
    isLoginRequest ? <Preloader /> :
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Вход
      </div>

      <form action="" className={style.form} onSubmit={onSubmitLogin}>
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
            Войти
          </Button>
        </div>
      </form>

      <div className={style.footer}>
        <div className={style.footer_link__wr}>
          <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</span>
          <Link className={ style.footer_link + " text text_type_main-default"} to="/register"> Зарегистрироваться</Link>
        </div>

        <div className={style.footer_link__wr}>
          <span className="text text_type_main-default text_color_inactive">Забыли пароль?</span>
          <Link className={ style.footer_link + " text text_type_main-default"} to="/forgot-password"> Восстановить пароль</Link>
        </div>
      </div>

      {renderError()}
    </div>
  )
};

Login.propsType = {
  isLogged: PropTypes.bool,
  redirectTo:  PropTypes.string
}

export default Login;
