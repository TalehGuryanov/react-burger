import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css"
import {Link} from "react-router-dom";

const Register = () => {
  return (
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Регистрация
      </div>

      <form className={style.form}>
        <div className={style.form_field__wr}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"user"}
            error={false}
            size={"default"}
          />
        </div>
        <div className={style.form_field__wr}>
          <EmailInput
            name={"email"}
          />
        </div>
        <div className={style.form_field__wr}>
          <PasswordInput
            name={"password"}
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
          <Link className={ style.footer_link + " text text_type_main-default"} to="/login"> Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
