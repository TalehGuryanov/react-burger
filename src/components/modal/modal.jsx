import style from "./modal.module.css"
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import React from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = (props) => {
  const modalContainer = document.getElementById("react-modals");

  React.useEffect(() => {
    function keyCloseModal(e) {
      if(e.code === "Escape") {
        props.onCloseModal();
      }
    }

    document.addEventListener("keyup", keyCloseModal)

    return(() => document.removeEventListener("keyup", keyCloseModal))
  }, [props.onCloseModal]);

  const modalTitle = <h3 className={"text text_type_main-large"}>{props.title}</h3>;

  return(
    ReactDOM.createPortal(
    <div className={style.wr}>
      <ModalOverlay onClose={props.onCloseModal}/>
      <div className={style.content} >
        <div className={style.header}>
          {props.title && modalTitle}

          <div className={style.header__icon_close}>
            <CloseIcon type="primary" onClick={props.onCloseModal}/>
          </div>
        </div>

        <div className={style.body}>
          {props.children}
        </div>
      </div>
    </div>,
    modalContainer
    )
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Modal;