import React, {useState} from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css"
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks";
import {registerUserThunk} from "../../services/actions/auth";
import {Notification} from "../../components/notification/notification";
import {RootState, TIsLogged} from "../../services/types";

type TRegisterProps = {
  isLogged: TIsLogged,
  redirectTo: string
}

const Register: React.FC<TRegisterProps> = ({isLogged, redirectTo}) => {
  const { isAuthSuccess, isAuthError } = useSelector(store => store.authResponse);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitRegistration: (event: React.FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();
    dispatch(registerUserThunk(userName, email, password));
  };

  const onSetName: ({target}: React.ChangeEvent<HTMLInputElement>) => void = ({target}) => {
    setUserName(target.value);
  }

  const onSetEmail: ({target}: React.ChangeEvent<HTMLInputElement>) => void = ({target}) => {
    setEmail(target.value);
  }

  const onSetPassword: ({target}: React.ChangeEvent<HTMLInputElement>) => void = ({target}) => {
    setPassword(target.value);
  }

  const renderResult: () => React.ReactNode = () => {
    if (isAuthError){
      return <Notification text="Что-то пошло не так. Попробуйте еще раз" status={false}/>
    } else if(isAuthSuccess) {
      return <Notification text="Спасибо за регистрацию" status={true}/>
    }
  }

  if(isLogged) {
    return (
      <Redirect to={redirectTo}/>
    );
  }

  return (
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
