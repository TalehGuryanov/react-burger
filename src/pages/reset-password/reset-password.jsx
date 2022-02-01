import React from "react";
import {Link} from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";

const ResetPassword = () => {
  return (
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Восстановление пароля
      </div>

      <form className={style.form}>
        <div className={style.form_field__wr}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            name={"password"}
            error={false}
            size={"default"}
          />
        </div>
        <div className={style.form_field__wr}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"code"}
            error={false}
            size={"default"}
          />
        </div>
        <div className={style.form_submit__wr}>
          <Button type="primary" size="medium">
            Сохранить
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

export default ResetPassword;
