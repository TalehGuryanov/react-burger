import React  from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./login.module.css";

const Login = () => {
  return (
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Вход
      </div>

      <form action="" className={style.form}>
        <div className={style.form_field__wr}>
          <EmailInput name={"email"} />
        </div>
        <div className={style.form_field__wr}>
          <PasswordInput
            name={"password"}
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
    </div>
  )
};

export default Login;
