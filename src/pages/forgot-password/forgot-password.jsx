import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Восстановление пароля
      </div>

      <form className={style.form}>
        <div className={style.form_field__wr}>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            error={false}
            size={"default"}
          />
        </div>
        <div className={style.form_submit__wr}>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>

      <div className={style.footer}>
        <div className={style.footer_link__wr}>
          <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?</span>
          <Link className={ style.footer_link + " text text_type_main-default"} to="/login"> Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
