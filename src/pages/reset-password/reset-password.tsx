import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";
import {useDispatch, useSelector} from "../../services/hooks";
import {resetPasswordThunk} from "../../services/actions/auth";
import {Preloader} from "../../components/preloader/preloader";
import {Notification} from "../../components/notification/notification";
import {RootState} from "../../services/types";

const ResetPassword = () => {
  const { resetPasswordRequest, resetPasswordSuccess, resetPasswordError } = useSelector(store => store.authResponse);
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onResetPassword: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();
    dispatch(resetPasswordThunk(password, code));
  }

  const onSetPassword: ({target}: React.ChangeEvent<HTMLInputElement>) => void = ({target}) => {
    setPassword(target.value);
  }

  const onSetCode: ({target}: React.ChangeEvent<HTMLInputElement>) => void = ({target}) => {
    setCode(target.value);
  }

  const renderResponse: () => React.ReactNode = () => {
    if (resetPasswordError){
      return <Notification text="Что-то пошло не так. Попробуйте еще раз" status={false}/>
    } else if(resetPasswordSuccess) {
      return <Notification text="Пароль успешно восстановлен" status={false}/>
    }
  }

  if(resetPasswordSuccess) {
    return (
      <Redirect to={ '/login' }/>
    );
  }

  return (
    resetPasswordRequest ? <Preloader /> :
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Восстановление пароля
      </div>

      <form className={style.form} onSubmit={onResetPassword}>
        <div className={style.form_field__wr}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            name={"password"}
            error={false}
            size={"default"}
            onChange={onSetPassword}
            value={password}
          />
        </div>
        <div className={style.form_field__wr}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"code"}
            error={false}
            size={"default"}
            onChange={onSetCode}
            value={code}
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
      {renderResponse()}
    </div>
  );
};

export default ResetPassword;
