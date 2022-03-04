import style from "./modal.module.css"
import ReactDOM from "react-dom";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import React from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOnCLoseModal} from "../../utils/types";

type TModalProps = {
  title?: string
  children: React.ReactNode
  onCloseModal: TOnCLoseModal
}

export const Modal: React.FC<TModalProps> = ({title, children, onCloseModal}) => {
  const modalContainer:HTMLElement | null = document.getElementById("react-modals");

  React.useEffect(() => {
    const keyCloseModal: (event: KeyboardEvent) => void = (event) => {
      if(event.code === "Escape") {
        onCloseModal();
      }
    }

    document.addEventListener("keyup", (event) => keyCloseModal(event))

    return(() => document.removeEventListener("keyup", (event) => keyCloseModal(event)))
  }, [onCloseModal]);

  const modalTitle = <h3 className={"text text_type_main-large"}>{title}</h3>;

  return(
    modalContainer &&
    ReactDOM.createPortal(
    <div className={style.wr}>
      <ModalOverlay onCloseModal={onCloseModal}/>
      <div className={style.content} >
        <div className={style.header}>
          {title && modalTitle}

          <div className={style.header__icon_close}>
            <CloseIcon type="primary" onClick={onCloseModal}/>
          </div>
        </div>

        <div className={style.body}>
          {children}
        </div>
      </div>
    </div>,
    modalContainer
    )
  )
};
