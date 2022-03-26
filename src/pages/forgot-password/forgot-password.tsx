import React, {useState} from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";
import {Link, Redirect} from "react-router-dom";
import {forgotPasswordThunk} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "../../components/preloader/preloader";
import {Notification} from "../../components/notification/notification";
import {TIsLogged} from "../../utils/types";
import {AppDispatch, RootState} from "../../index";

type TForgotPasswordProps = {
  isLogged: TIsLogged,
  redirectTo: string
}

const ForgotPassword: React.FC<TForgotPasswordProps> = ({isLogged, redirectTo}) => {
  const { isPasswordCodeRequest, isPasswordCodeError, isPasswordCodeSuccess } = useSelector((store: RootState) => store.authResponse);
  const [email, setEmail] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const onSetEmail = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  }

  const onResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(forgotPasswordThunk(email));
  }

  const renderError= () => {
    if (isPasswordCodeError){
      return <Notification text="Что-то пошло не так. Попробуйте еще раз" status={false}/>
    }
  }

  if(isLogged) {
    return (
      <Redirect to={ redirectTo }/>
    );
  }

  return (
    isPasswordCodeSuccess ? <Redirect to={"/reset-password"} /> :
    isPasswordCodeRequest ? <Preloader /> :
    <div className={style.wr}>
      <div className={style.title + " text text_type_main-medium"}>
        Восстановление пароля
      </div>

      <form className={style.form} onSubmit={onResetPassword}>
        <div className={style.form_field__wr}>
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            name={"email"}
            error={false}
            size={"default"}
            onChange={onSetEmail}
            value={email}
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

      {renderError()}
    </div>
  );
};

export default ForgotPassword;
